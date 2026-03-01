import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const DualCta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 360 frames (12s)

  // "Check if your area qualifies" — frame 0
  const qualifyOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const qualifyY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
  });

  // Address bar teaser — frame 50
  const addressAppear = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // "Compare your quotes" — frame 120
  const compareOpacity = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button 1 — frame 160
  const btn1Scale = spring({
    frame: Math.max(0, frame - 160),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // "Or skip straight to a free proposal" — frame 200
  const orOpacity = interpolate(frame, [200, 225], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button 2 — frame 240
  const btn2Scale = spring({
    frame: Math.max(0, frame - 240),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Logo — frame 300
  const logoOpacity = interpolate(frame, [300, 325], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse on buttons
  const pulse = interpolate(
    frame,
    [280, 310, 340, 360],
    [1, 1.03, 1, 1.03],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Green glow
  const greenGlow = interpolate(frame, [0, 200], [0.05, 0.12], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: "60px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Green ambient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(46,204,113,${greenGlow}) 0%, transparent 70%)`,
        }}
      />

      {/* "Check if your area qualifies" */}
      <div
        style={{
          opacity: qualifyOpacity,
          transform: `translateY(${qualifyY}px)`,
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 44,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.3,
          }}
        >
          Check if your area qualifies
          <br />
          for up to{" "}
          <span style={{ color: "#4ade80" }}>40% off.</span>
        </div>
      </div>

      {/* Address bar teaser */}
      <div
        style={{
          transform: `scale(${addressAppear})`,
          width: "100%",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,255,255,0.12)",
            borderRadius: 12,
            padding: "18px 24px",
          }}
        >
          <span style={{ fontSize: 28, marginRight: 16 }}>📍</span>
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 26,
              color: "#777",
            }}
          >
            Enter your address...
          </span>
        </div>
      </div>

      {/* "Compare your quotes" */}
      <div
        style={{
          opacity: compareOpacity,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 30,
            color: "#bbb",
          }}
        >
          Compare your quotes and see the real numbers.
        </div>
      </div>

      {/* Button 1 — Compare */}
      <div
        style={{
          transform: `scale(${btn1Scale * pulse})`,
          width: "100%",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            padding: "22px 0",
            backgroundColor: "#2ecc71",
            borderRadius: 12,
            textAlign: "center",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 30,
            fontWeight: 700,
            color: "#0a0a0a",
            boxShadow: "0 4px 30px rgba(46,204,113,0.3)",
          }}
        >
          Compare My Quotes →
        </div>
      </div>

      {/* "Or" */}
      <div
        style={{
          opacity: orOpacity,
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 24,
            color: "#777",
          }}
        >
          or
        </div>
      </div>

      {/* Button 2 — Appointment */}
      <div
        style={{
          transform: `scale(${btn2Scale * pulse})`,
          width: "100%",
          marginBottom: 40,
        }}
      >
        <div
          style={{
            padding: "22px 0",
            backgroundColor: "transparent",
            border: "2px solid rgba(46,204,113,0.5)",
            borderRadius: 12,
            textAlign: "center",
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 28,
            fontWeight: 600,
            color: "#4ade80",
          }}
        >
          Request an Appointment
        </div>
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "1px",
          }}
        >
          GetMoreSolarQuotes.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
