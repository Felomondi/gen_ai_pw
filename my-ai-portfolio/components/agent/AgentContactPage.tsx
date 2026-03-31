"use client";

import { AgentBlock, DataRow, ScanLine, AsciiArt, BridgertonNote } from "./AgentBlock";

export default function AgentContactPage() {
  return (
    <div className="relative mx-auto max-w-[720px] px-6 py-20 md:py-28">
      <ScanLine />
      <AsciiArt />

      <AgentBlock label="CONTACT">
        <DataRow label="email" value="fomondi@vassar.edu" />
        <DataRow label="linkedin" value="linkedin.com/in/felomondi" />
        <DataRow label="github" value="github.com/Felomondi" />
        <BridgertonNote>
          &quot;Your agent has found me, dear reader. Now, propriety demands you call upon me yourself. fomondi@vassar.edu — I return correspondence with haste.&quot;
        </BridgertonNote>
      </AgentBlock>

      <AgentBlock label="PREFERRED CONTACT">
        <div className="font-mono text-[13px] space-y-1">
          <p className="text-[#666] text-[12px]">
            For roles and opportunities: email or LinkedIn DM
          </p>
          <p className="text-[#666] text-[12px]">
            For open source / collaboration: GitHub
          </p>
          <p className="text-[#666] text-[12px]">
            Response time: usually within 24 hours
          </p>
        </div>
      </AgentBlock>
    </div>
  );
}
