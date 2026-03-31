"use client";

import { AgentBlock, ScanLine, AsciiArt } from "./AgentBlock";

const experiences = [
  {
    role: "Founder",
    company: "Audrey",
    date: "Nov 2025 – Present",
    location: "Stealth",
    points: [
      "building tools around agent safety and control in production systems, starting with voice agents",
    ],
    skills: ["agent safety", "voice agents"],
  },
  {
    role: "Software Engineer Intern",
    company: "Morgan Stanley",
    date: "Jun – Aug 2025",
    location: "New York, NY",
    points: [
      "built a python lineage/telemetry tool that traced records end-to-end through the ETL data-quality pipeline, pinpointing failures to the exact stage and rule",
      "developed a rule-analytics service that surfaced pass/fail rates, trend deltas, and a standardized failure taxonomy, with stakeholder-ready dashboards/exports",
      "designed dashboards with prometheus and grafana to visualize process flows and rule performance, streamlining debugging",
    ],
    skills: ["python", "sql", "prometheus", "grafana", "opentelemetry"],
  },
  {
    role: "Co-Founder",
    company: "LunchBox",
    date: "Jan – Aug 2025",
    location: "",
    points: [
      "co-founded lunchbox, a restaurant reviewing app for recording, rating, and sharing dining experiences",
      "developed and implemented 7+ core features, including search, view profiles, post reviews, add restaurants, and user authentication",
      "utilized firebase for data persistence and account authentication, managing 100+ user accounts securely",
    ],
    skills: ["firebase", "react", "javascript"],
  },
  {
    role: "Software Engineer Intern",
    company: "Amazon",
    date: "May – Aug 2024",
    location: "Seattle, WA",
    points: [
      "shipped new android alexa features in java and iterated via A/B tests and performance tuning, increasing engagement with core flows by 15%",
      "translated figma specs into accessible, production-quality UI; partnered with PM/design to refine interactions, ensure localization, and instrument analytics",
      "built reusable UI components and patterns, reducing follow-on implementation time by ~20% and improving reliability with unit/UI tests and CI checks",
    ],
    skills: ["java", "android"],
  },
  {
    role: "Tech Developer Intern",
    company: "Sponsors For Educational Opportunities",
    date: "Jun – Aug 2024",
    location: "Remote",
    points: [
      "built a full-stack book reviewing and rating app using SQL, python (flask), and react",
      "performed API development, integration, and systems testing",
    ],
    skills: ["python", "mysql", "react", "flask"],
  },
];

export default function AgentExperiencePage() {
  return (
    <div className="relative mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <ScanLine />
      <AsciiArt />

      {experiences.map((exp) => (
        <AgentBlock key={`${exp.company}-${exp.role}`} label={exp.company.toUpperCase()}>
          <div className="font-mono text-[13px]">
            <p className="font-semibold text-[#1a1a1a]">
              {exp.role}{" "}
              <span className="font-normal text-[#999]">({exp.date})</span>
            </p>
            {exp.location && <p className="text-[#999] text-[11px]">{exp.location}</p>}
            <ul className="mt-2 space-y-1">
              {exp.points.map((p, i) => (
                <li key={i} className="text-[#666] text-[12px] pl-0.5 flex gap-1.5">
                  <span className="text-[#999]">-</span>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[#999] text-[11px]">{exp.skills.join(" · ")}</p>
          </div>
        </AgentBlock>
      ))}
    </div>
  );
}
