import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const CommissionProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 510 frames total

  // "But that's not even the worst part." — frame 0
  const worstOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const worstFadeOut = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // System price bar — frame 90
  const barAppear = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Commission chunk breaks off — frame 150
  const chunkBreak = interpolate(frame, [150, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chunkX = interpolate(frame, [150, 200], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chunkPulse = interpolate(
    frame,
    [200, 230, 260, 290, 320],
    [1, 0.6, 1, 0.6, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // "This is what your solar company took" — frame 200
  const commTextOpacity = interpolate(frame, [200, 225], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Jab lines — stagger from frame 250
  const jabs = [
    "On a system they're charging YOU for.",
    "That they still own.",
    "That gets more expensive every year.",
  ];

  // "And the tax credits?" — frame 370
  const taxIntroOpacity = interpolate(frame, [370, 395], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Credit sliding away animation — frame 410
  const creditSlide = interpolate(frame, [410, 460], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const creditSlideOpacity = interpolate(frame, [410, 460], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "They claimed those too." — frame 460
  const claimedOpacity = interpolate(frame, [460, 485], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Amber warning ambient
  const amberGlow = interpolate(frame, [90, 300], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: "60px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Amber ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(243,156,18,${amberGlow}) 0%, transparent 70%)`,
        }}
      />

      {/* "But that's not even the worst part" */}
      <div
        style={{
          opacity: worstOpacity * worstFadeOut,
          textAlign: "center",
          marginTop: 400,
          position: "absolute",
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 52,
            fontWeight: 700,
            color: "#fbbf24",
            lineHeight: 1.3,
          }}
        >
          But that's not even
          <br />
          the worst part.
        </div>
      </div>

      {/* System price bar */}
      <div
        style={{
          opacity: barAppear,
          marginTop: 200,
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 24,
            color: "#777",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          SYSTEM COST
        </div>

        {/* Price bar container */}
        <div style={{ position: "relative", height: 80 }}>
          {/* Main bar (remaining after commission) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 80,
              width: `${70 - chunkBreak * 5}%`,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "12px 0 0 12px",
              display: "flex",
              alignItems: "center",
              paddingLeft: 20,
            }}
          >
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 30,
                fontWeight: 700,
                color: "#ccc",
              }}
            >
              $38,232
            </span>
          </div>

          {/* Commission chunk */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: chunkBreak * 100,
              height: 80,
              width: "30%",
              backgroundColor: `rgba(231,76,60,${0.3 + chunkPulse * 0.4})`,
              border: "2px solid rgba(231,76,60,0.6)",
              borderRadius: chunkBreak > 0.5 ? 12 : "0 12px 12px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateX(${chunkX}px)`,
            }}
          >
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 26,
                fontWeight: 700,
                color: "#ff6b5a",
              }}
            >
              $8K – $15K
            </span>
          </div>
        </div>

        {/* Commission label */}
        <div
          style={{
            opacity: commTextOpacity,
            textAlign: "center",
            marginTop: chunkBreak > 0 ? 120 : 20,
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 34,
              fontWeight: 600,
              color: "#f5f5f5",
              lineHeight: 1.4,
            }}
          >
            That's what your solar company
            <br />
            <span style={{ color: "#fbbf24" }}>took in commissions.</span>
          </div>
        </div>
      </div>

      {/* Jab lines */}
      <div
        style={{
          marginTop: 50,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {jabs.map((jab, i) => {
          const jabStart = 260 + i * 40;
          const jabOpacity = interpolate(
            frame,
            [jabStart, jabStart + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const jabX = interpolate(
            frame,
            [jabStart, jabStart + 20],
            [i % 2 === 0 ? -30 : 30, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={i}
              style={{
                opacity: jabOpacity,
                transform: `translateX(${jabX}px)`,
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 30,
                fontWeight: 500,
                color: "#bbb",
                lineHeight: 1.4,
              }}
            >
              {jab}
            </div>
          );
        })}
      </div>

      {/* Tax credit section */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 60,
          right: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: taxIntroOpacity,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 32,
            color: "#999",
            marginBottom: 20,
          }}
        >
          And the 30% federal tax credit?
        </div>

        {/* Credit sliding away */}
        <div
          style={{
            opacity: taxIntroOpacity,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 28,
              color: "#777",
            }}
          >
            You →
          </div>
          <div
            style={{
              padding: "12px 24px",
              backgroundColor: "rgba(46,204,113,0.15)",
              border: "2px solid rgba(46,204,113,0.4)",
              borderRadius: 8,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 28,
              fontWeight: 700,
              color: "#4ade80",
              transform: `translateX(${creditSlide}px)`,
              opacity: creditSlideOpacity,
            }}
          >
            30% Credit
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 28,
              color: "#777",
              opacity: interpolate(frame, [430, 460], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            → Company
          </div>
        </div>

        {/* "They claimed those too" */}
        <div
          style={{
            opacity: claimedOpacity,
            marginTop: 30,
            fontFamily: '"Playfair Display", serif',
            fontSize: 38,
            fontWeight: 700,
            color: "#e74c3c",
          }}
        >
          They claimed those too. Not you.
        </div>
      </div>
    </AbsoluteFill>
  );
};
