import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "The Best Way To Go Solar in 2026" — fades in from 0
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 30], [40, 0], {
    extrapolateRight: "clamp",
  });
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // "...starts with understanding how most people got it wrong." — appears at frame 90
  const subDelay = 90;
  const subOpacity = interpolate(frame, [subDelay, subDelay + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subY = interpolate(frame, [subDelay, subDelay + 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle glow pulse behind title
  const glowOpacity = interpolate(
    frame,
    [0, 60, 120, 180, 240],
    [0, 0.15, 0.08, 0.15, 0.08]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(46,204,113,0.3) 0%, transparent 70%)",
          opacity: glowOpacity,
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 82,
            fontWeight: 800,
            color: "#f5f5f5",
            lineHeight: 1.15,
            letterSpacing: "-1px",
          }}
        >
          The Best Way
          <br />
          To Go Solar
          <br />
          <span
            style={{
              color: "#4ade80",
              fontStyle: "italic",
            }}
          >
            in 2026
          </span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          textAlign: "center",
          marginTop: 50,
          position: "absolute",
          bottom: 500,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.5,
          }}
        >
          ...starts with understanding how
          <br />
          most people{" "}
          <span style={{ color: "#e74c3c", fontWeight: 600 }}>
            got it wrong.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
