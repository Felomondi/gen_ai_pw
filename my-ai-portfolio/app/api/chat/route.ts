// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

/* ---------- Domain types (no `any`) ---------- */

// What your frontend sends (supports both `content` and `parts` shapes)
interface TextPart { text?: string }
interface MsgBase { role?: string }
interface MsgOpenAI extends MsgBase {
  content?: string | { text?: string } | TextPart[];
}
interface MsgParts extends MsgBase {
  parts?: TextPart[];
}
type IncomingMessage = MsgOpenAI | MsgParts;
interface IncomingBody {
  messages?: IncomingMessage[];
}

// Gemini request types
interface GeminiUserContent {
  role: "user";
  parts: { text: string }[];
}
type GeminiContentsInput = GeminiUserContent[];

// Gemini response types (minimal set we actually read)
interface GeminiRespPart { text?: string }
interface GeminiRespContent { parts?: GeminiRespPart[] }
interface GeminiRespCandidate {
  content?: GeminiRespContent;
  text?: string; // sometimes present
}
interface GeminiResponse {
  candidates?: GeminiRespCandidate[];
  responseId?: string;
  modelVersion?: string;
  usageMetadata?: unknown;
}

/* ---------- Compact knowledge base ---------- */
const knowledgeBase = `
Felix Omondi — Snapshot
- Location: Poughkeepsie, NY
- Contact: fomondi@vassar.edu | LinkedIn: linkedin.com/in/felomondi | GitHub: github.com/Felomondi | Portfolio: felixomondi.vercel.app

Education
- BSc Computer Science & Math (Statistics), Vassar College — Expected May 2026
- Relevant Coursework: Object-Oriented Programming (Java), Data Structures & Algorithms, Data Science, Android Development, Compilers, Operating Systems, Computer Networks

Experience
- Morgan Stanley — Software Engineer Intern, New York City, NY (Jun 2025–Aug 2025)
  • Built a Python tracking tool to monitor user data through a quality-check pipeline and pinpoint failing stages
  • Developed analytics to report success/failure rates of data quality rules for clients and developers
  • Designed dashboards using Prometheus & Grafana to visualize flows/rule performance and streamline debugging
- Amazon — Software Engineer Intern, Seattle, WA (May 2024–Aug 2024)
  • Implemented new user-facing features for the Android Alexa UI in Java → ~15% increase in engagement with core features
  • Collaborated with design/PM to translate wireframes into responsive, high-quality UI
  • Engineered reusable front-end components → ~20% reduction in future implementation time
- Sponsors For Educational Opportunities (SEO) — Tech Developer Intern, Remote (Jun 2024–Aug 2024)
  • Built a full-stack book-reviewing/rating web app (Flask + SQL + React)
  • Led API development, integration, and systems testing
- Vassar College — Computer Science Tutor, Poughkeepsie, NY (Jan 2023–Mar 2024)
  • Personalized tutoring improved student test scores by ~15%
  • Positive reinforcement and support led to ~50% increase in repeat sessions

Skills
- Languages/Frameworks: Python, Java, JavaScript/TypeScript, React, Next.js, SQL/MySQL, C++, Kotlin, OCaml, Vue.js, HTML/CSS
- Tools/Technologies: Git, Linux, Docker, Android Studio, AWS, Django, FastAPI, REST APIs, Prometheus, Grafana, OpenTelemetry, Scrapy, Figma, .NET

Projects
- CoTeacher AI (TypeScript, Python, Tailwind, Supabase) — founder
  • AI co-teacher platform with per-course RAG tutors trained on each class’s professor materials
  • Secure, role-based workflows and course-aware AI chat
- SlidesDeck.ai (FastAPI, OpenAI, Railway, Tailwind, TypeScript, Python)
  • AI slide-outline generator turning long briefs into structured decks
  • Two-stage prompt + self-critique pipeline with strict constraints (slide count, bullets/slide)
  • Polished React UI (Framer Motion), inline editing, light/dark “glass” UI, loading animations, “generate variations”
- LunchBox (Kotlin/Java, Firebase, JavaScript, Azure, PostgreSQL)
  • Restaurant reviewing app: search, profiles, reviews, add restaurants, authentication
  • Firebase for persistence/auth; managed 100+ user accounts; prototyped with seed data
- LitLore (Java, React, SCSS, Python, Docker) — Android + web
  • Book discovery via Google Books API; auth, star-based ratings, text reviews
  • Dockerized for consistent dev/deploy

Links
- Portfolio: https://felixomondi.vercel.app/
- CoTeacher: https://frontend-coteacher.vercel.app/
- SlidesDeck: https://slidesdeck.vercel.app/
- LitLore (Android repo): https://github.com/Felomondi/Litlore-android
- LitLore (web): https://litlore.netlify.app/
`;

const rules = `
You are Felix Omondi's professional assistant.
Use ONLY the context. If a fact isn't present, say you don't have it and suggest the contact form.
Be concise and answer the question directly.
`.trim();

/* ---------- Helpers ---------- */

// Accepts both shapes your UI might send
function getTextFromMessage(msg: IncomingMessage): string {
  // OpenAI-ish `content`
  const c = (msg as MsgOpenAI).content;
  if (typeof c === "string") return c;
  if (typeof (c as { text?: string } | undefined)?.text === "string") {
    return (c as { text?: string }).text as string;
  }
  if (Array.isArray(c)) {
    const t = (c as TextPart[])
      .map((p) => (typeof p?.text === "string" ? p.text : ""))
      .filter(Boolean)
      .join("\n");
    if (t) return t;
  }
  // Your UI `parts`
  const p = (msg as MsgParts).parts;
  if (Array.isArray(p)) {
    const t = p
      .map((pt) => (typeof pt?.text === "string" ? pt.text : ""))
      .filter(Boolean)
      .join("\n");
    if (t) return t;
  }
  return "";
}

function norm(s: string): string {
  // normalize curly quotes and whitespace
  return s
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

const GREETING_LINE = /^(hi|hello|hey|yo|howdy)\b[\s!.]*$/i;

// Flexible banner fragments (handles ' and ’ after normalization)
const BANNER_FRAGMENTS: RegExp[] = [
  /i'?m felix(?:'s)?(?: ai)? assistant/gi,
  /felix(?:'s)? ai assistant/gi,
  /ask me about (?:his|felix'?s) skills,? experience,? or projects/gi,
  /ask me about (?:his|felix'?s) (skills|experience|projects)/gi,
];

// Remove banners/greetings even if banner + question share ONE message.
function cleanUserText(raw: string): string {
  if (!raw) return "";
  let s = norm(raw);
  for (const re of BANNER_FRAGMENTS) s = s.replace(re, "");
  // Remove standalone greeting lines
  const lines = s
    .split(/\r?\n/)
    .map((l) => norm(l))
    .filter((l) => l.length > 0 && !GREETING_LINE.test(l));

  if (lines.length === 0) return "";

  // If multiple lines remain, pick the last that looks like a question/statement (≥4 words or ends with ?)
  for (let i = lines.length - 1; i >= 0; i--) {
    const L = lines[i];
    const words = L.split(/\s+/).length;
    if (/[?]$/.test(L) || words >= 4) return L;
  }
  // Otherwise, take the last non-empty line
  return lines[lines.length - 1];
}

function selectLatestQuestion(msgs: IncomingMessage[]): string | null {
  // scan from the end to handle either oldest-first or newest-first
  for (let i = msgs.length - 1; i >= 0; i--) {
    if ((msgs[i]?.role || "").toLowerCase() !== "user") continue;
    const cleaned = cleanUserText(getTextFromMessage(msgs[i]));
    if (cleaned) return cleaned;
  }
  return null;
}

async function callGemini(
  apiKey: string,
  contents: GeminiContentsInput,
  maxTokens = 512
): Promise<{ ok: boolean; status: number; data: GeminiResponse }> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  const payload = {
    contents,
    generationConfig: { temperature: 0.2, maxOutputTokens: maxTokens },
    // Make harmless bio answers less likely to be blocked
    safetySettings: [
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    ],
  } as const;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as unknown as GeminiResponse;
  return { ok: res.ok, status: res.status, data };
}

function extractText(data: GeminiResponse): string {
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const merged = parts.map((p) => p?.text ?? "").filter(Boolean).join("\n").trim();
  const fallback = (data?.candidates?.[0]?.text ?? "").toString().trim();
  return merged || fallback;
}

/* ---------- Route ---------- */

// export const runtime = "nodejs"; // works locally and on most hosts
export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is not available.");
    return NextResponse.json(
      { error: "Server configuration error: Missing API Key." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as IncomingBody;
    const messages = (body?.messages ?? []) as IncomingMessage[];

    // ✅ Pull the actual question even if banner+question share one message
    const userText = selectLatestQuestion(messages);

    // If we truly only have greetings/banners, reply locally with a single line
    if (!userText || GREETING_LINE.test(userText)) {
      return NextResponse.json({
        reply: "Hi! Ask me about Felix’s skills, experience, or projects—happy to help.",
      });
    }

    // Single-turn prompt (tight + KB)
    const contents: GeminiContentsInput = [
      {
        role: "user",
        parts: [
          {
            text:
              `${rules}\n\n` +
              `--- CONTEXT START ---\n${knowledgeBase}\n--- CONTEXT END ---\n\n` +
              `Question: ${userText}\n` +
              `Answer directly and concisely using ONLY the context.`,
          },
        ],
      },
    ];

    // First attempt
    let { ok, status, data } = await callGemini(apiKey, contents, 512);
    if (!ok) {
      console.error("ERROR RESPONSE FROM GEMINI API:", JSON.stringify(data, null, 2));
      return NextResponse.json(
        { error: "Failed to get response from AI", details: data },
        { status }
      );
    }

    let text = extractText(data);

    // Rare empty reply → minimal retry
    if (!text) {
      const minimal: GeminiContentsInput = [
        {
          role: "user",
          parts: [
            {
              text:
                `Use ONLY this context to answer. If unknown, say so.\n` +
                `Context:\n${knowledgeBase}\n\nQ: ${userText}\nA:`,
            },
          ],
        },
      ];
      ({ ok, status, data } = await callGemini(apiKey, minimal, 768));
      if (!ok) {
        console.error("ERROR RESPONSE FROM GEMINI API (retry):", JSON.stringify(data, null, 2));
        return NextResponse.json(
          { error: "Failed to get response from AI (retry)", details: data },
          { status }
        );
      }
      text = extractText(data);
    }

    if (!text) {
      console.error("No content in AI response after retry:", JSON.stringify(data, null, 2));
      return NextResponse.json({ error: "No content in AI response" }, { status: 500 });
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("FATAL ERROR in /api/chat:", message);
    return NextResponse.json(
      { error: "Something went wrong on the server.", details: message },
      { status: 500 }
    );
  }
}