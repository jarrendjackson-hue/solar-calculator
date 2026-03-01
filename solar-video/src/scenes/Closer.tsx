import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 180 frames (6s)

  // Fade everything to dark first
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Main line
  const textScale = spring({
    frame: Math.max(0, frame - 20),
    fps,
    config: { damping: 18, stiffness: 60 },
  });

  // "own it" emphasis glow
  const ownGlow = interpolate(
    frame,
    [60, 90, 120, 150, 180],
    [0.5, 1, 0.7, 1, 0.8],
    { extrapolateLeft: "clamp" }
  );

  // Logo fade
  const logoOpacity = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px",
      }}
    >
      {/* Subtle green glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(46,204,113,0.1) 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          opacity: fadeIn,
          transform: `scale(${textScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 48,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.3,
          }}
        >
          The best way to go solar
          <br />
          in 2026 is to{" "}
          <span
            style={{
              color: "#4ade80",
              fontStyle: "italic",
              textShadow: `0 0 ${ownGlow * 30}px rgba(46,204,113,${ownGlow * 0.4})`,
            }}
          >
            own it.
          </span>
        </div>
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          position: "absolute",
          bottom: 200,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 24,
            fontWeight: 600,
            color: "#555",
            letterSpacing: "2px",
          }}
        >
          GETMORESOLARQUOTES.COM
        </div>
      </div>
    </AbsoluteFill>
  );
};
