import { AbsoluteFill, Sequence } from "remotion";
import { Hook } from "./scenes/Hook";
import { PpaTrap } from "./scenes/PpaTrap";
import { CommissionProblem } from "./scenes/CommissionProblem";
import { TheSolution } from "./scenes/TheSolution";
import { DualCta } from "./scenes/DualCta";
import { Closer } from "./scenes/Closer";

// 90 seconds @ 30fps = 2700 frames total
// Act 1: Hook         0-8s    (0-240)
// Act 2: PPA Trap     8-25s   (240-750)
// Act 3: Commissions  25-42s  (750-1260)
// Act 4: Solution     42-72s  (1260-2160)
// Act 5: CTA          72-84s  (2160-2520)
// Act 6: Closer       84-90s  (2520-2700)

export const SolarVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <Sequence from={0} durationInFrames={240}>
        <Hook />
      </Sequence>
      <Sequence from={240} durationInFrames={510}>
        <PpaTrap />
      </Sequence>
      <Sequence from={750} durationInFrames={510}>
        <CommissionProblem />
      </Sequence>
      <Sequence from={1260} durationInFrames={900}>
        <TheSolution />
      </Sequence>
      <Sequence from={2160} durationInFrames={360}>
        <DualCta />
      </Sequence>
      <Sequence from={2520} durationInFrames={180}>
        <Closer />
      </Sequence>
    </AbsoluteFill>
  );
};
