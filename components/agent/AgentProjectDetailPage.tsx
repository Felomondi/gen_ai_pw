"use client";

import { AgentBlock, DataRow, ScanLine } from "./AgentBlock";

type ProjectData = {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  features: string[];
  challenges: string[];
  techStack: {
    frontend?: string[];
    backend?: string[];
    database?: string[];
    infrastructure?: string[];
  };
};

export default function AgentProjectDetailPage({ project }: { project: ProjectData }) {
  return (
    <div className="relative mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <ScanLine />

      <AgentBlock label={project.title.toUpperCase()}>
        <DataRow label="name" value={`"${project.title}"`} />
        <DataRow label="summary" value={project.description} />
        {project.githubUrl && <DataRow label="code" value={project.githubUrl} />}
        {project.liveUrl && <DataRow label="live" value={project.liveUrl} />}
        <DataRow label="tags" value={project.tags.join(" · ")} />
      </AgentBlock>

      <AgentBlock label="OVERVIEW">
        <p className="text-[13px] text-[#666] leading-[1.7]">{project.longDescription}</p>
      </AgentBlock>

      <AgentBlock label="TECH STACK">
        <div className="font-mono text-[13px] space-y-1">
          {Object.entries(project.techStack).map(([category, items]) =>
            items ? (
              <div key={category} className="flex gap-2">
                <span className="text-[#999] min-w-[100px]">{category}</span>
                <span className="text-[#1a1a1a]">{items.join(", ")}</span>
              </div>
            ) : null
          )}
        </div>
      </AgentBlock>

      <AgentBlock label="FEATURES">
        <ul className="font-mono text-[12px] text-[#666] space-y-1.5">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-[#999]">-</span>
              {f}
            </li>
          ))}
        </ul>
      </AgentBlock>

      <AgentBlock label="CHALLENGES">
        <ul className="font-mono text-[12px] text-[#666] space-y-1.5">
          {project.challenges.map((c, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="text-[#999]">-</span>
              {c}
            </li>
          ))}
        </ul>
      </AgentBlock>
    </div>
  );
}
