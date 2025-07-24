// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';

const knowledgeBase = `
  Felix Omondi's Profile:
  - Hobbies: Soccer, hip hop dancing, anime, reading books, travelling and coding.
  - Education: BSc Computer Science & Math (Statistics) from Vassar College, expected May 2026.
  - Key Skills: Python, React, Next.js, Java, SQL, JavaScript, HTML/CSS, Systems Design, Data Structures, Algorithm Design, UI/UX Design.
  - Current Role: Software Engineer Intern at Morgan Stanley (from June 2025).
  - Past Experience:
    - Netflix (Software Engineering Fellow): Focused on Python (DSA) and System Design.
    - SEO (Tech Developer Intern): Built a full-stack book review app with Python (Flask), MySQL, and React.
    - Vassar Haiti Project (Web Developer): Designed UIs with HTML, CSS, JS, and improved load times.
    - Bloomberg (Tech Lab): Built a Python-based portfolio manager with Jupyter Notebooks.
    - Equity Group Foundation (Mentor): Guided students through college applications.
  - Key Projects:
    - LitLore (Android App): A book discovery app using the Google Books API.
    - Restaurant Ordering System: A full-stack system using Vue.js and SQL.
    - Course Pre-Registration Algorithm: An optimization tool using Java and ILP.
    - Travelling Web UI/UX: A front-end for a hiking app using Next.js and Tailwind CSS.
`;

const systemPrompt = `
  You are Felix Omondi's friendly and professional AI assistant.
  Your goal is to answer questions from recruiters and potential employers based ONLY on the provided knowledge base about Felix.
  Do not make up information. If a question cannot be answered from the provided context, politely state that you don't have that information and suggest contacting Felix directly via the contact form.
  Keep your answers concise and to the point.
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("CRITICAL: GEMINI_API_KEY is not available in the environment.");
    return NextResponse.json({ error: 'Server configuration error: Missing API Key.' }, { status: 500 });
  }

  try {
    const { messages } = await req.json();

    const payload = {
      contents: messages,
      systemInstruction: {
        parts: [{ text: `${systemPrompt}\n\n${knowledgeBase}` }]
      },
      generationConfig: {
        temperature: 0.7,
      }
    };

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("ERROR RESPONSE FROM GEMINI API:", JSON.stringify(responseData, null, 2));
      return NextResponse.json({ error: 'Failed to get response from AI', details: responseData }, { status: response.status });
    }

    const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return NextResponse.json({ reply: text });
    } else {
      console.error("No content in AI response:", JSON.stringify(responseData, null, 2));
      return NextResponse.json({ error: 'No content in AI response' }, { status: 500 });
    }
  } catch (error) { // <-- FIX IS HERE
    const e = error as Error;
    console.error("FATAL ERROR in /api/chat:", e);
    return NextResponse.json({ error: 'Something went wrong on the server.', details: e.message }, { status: 500 });
  }
}