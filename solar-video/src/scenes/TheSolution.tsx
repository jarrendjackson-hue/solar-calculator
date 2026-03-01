import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export const TheSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 900 frames total (30s)

  // Background transition — dark to green tint
  const greenBg = interpolate(frame, [0, 120], [0, 0.04], {
    extrapolateRight: "clamp",
  });

  // "There's a better way." — frame 0
  const betterOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const betterFade = interpolate(frame, [80, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Most companies won't tell you about it." — frame 40
  const wontTellOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // System cost — frame 120
  const costAppear = interpolate(frame, [120, 145], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Credits sliding off — frame 200
  const creditSlide = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const systemCost = 38232;
  const minDiscount = 0.30;
  const maxDiscount = 0.40;
  const discountProgress = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentDiscount = minDiscount + (maxDiscount - minDiscount) * discountProgress;
  const creditAmount = Math.round(systemCost * currentDiscount);
  const newAmount = systemCost - creditAmount;

  // "30-40% taken right off the top" — frame 290
  const discountTextOpacity = interpolate(frame, [290, 315], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fixed payment — frame 360
  const fixedAppear = interpolate(frame, [360, 385], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lockBounce = spring({
    frame: Math.max(0, frame - 390),
    fps,
    config: { damping: 8, stiffness: 100 },
  });

  // Timeline — frame 450
  const timelineAppear = interpolate(frame, [450, 475], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const timelineProgress = interpolate(frame, [475, 560], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Ownership documents" — frame 570
  const ownTextOpacity = interpolate(frame, [570, 600], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Comparison table — frame 660
  const tableAppear = interpolate(frame, [660, 690], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Same solar. Different deal." — frame 830
  const closerOpacity = interpolate(frame, [830, 860], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const comparisonRows = [
    { ppa: "Pay forever", ours: "Own in 5 years" },
    { ppa: "Price goes up every year", ours: "Fixed. Never changes." },
    { ppa: "You never own it", ours: "Full ownership transferred" },
    { ppa: "Company keeps your credits", ours: "Credits reduce YOUR cost" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgba(10, 15, 10, 1)`,
        padding: "60px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Green ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(46,204,113,${greenBg + 0.03}) 0%, transparent 70%)`,
        }}
      />

      {/* "There's a better way" */}
      <div
        style={{
          opacity: betterOpacity * betterFade,
          textAlign: "center",
          marginTop: 350,
          position: "absolute",
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 56,
            fontWeight: 700,
            color: "#4ade80",
            lineHeight: 1.3,
          }}
        >
          There's a better way.
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 30,
            color: "#999",
            marginTop: 20,
            opacity: wontTellOpacity,
          }}
        >
          And most companies won't tell you about it.
        </div>
      </div>

      {/* System cost breakdown */}
      {frame >= 120 && (
        <div
          style={{
            opacity: costAppear,
            marginTop: 160,
            textAlign: "center",
            width: "100%",
          }}
        >
          {/* Original cost */}
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 24,
              color: "#777",
              marginBottom: 8,
            }}
          >
            SYSTEM COST
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 64,
              fontWeight: 800,
              color: creditSlide > 0 ? "#777" : "#f5f5f5",
              textDecoration: creditSlide > 0.5 ? "line-through" : "none",
              transition: "color 0.3s",
            }}
          >
            ${systemCost.toLocaleString()}
          </div>

          {/* Credit amount sliding off */}
          {creditSlide > 0 && (
            <div
              style={{
                marginTop: 20,
                opacity: creditSlide,
              }}
            >
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 42,
                  fontWeight: 700,
                  color: "#4ade80",
                }}
              >
                −${creditAmount.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 22,
                  color: "#4ade80",
                  opacity: 0.7,
                  marginTop: 4,
                }}
              >
                30-40% in credits — right off the top
              </div>
            </div>
          )}

          {/* New amount */}
          {creditSlide > 0.8 && (
            <div style={{ marginTop: 30 }}>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 24,
                  color: "#777",
                  marginBottom: 8,
                }}
              >
                YOU FINANCE
              </div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 72,
                  fontWeight: 800,
                  color: "#4ade80",
                  letterSpacing: "-2px",
                }}
              >
                ${newAmount.toLocaleString()}
              </div>
            </div>
          )}

          {/* Discount text */}
          <div
            style={{
              opacity: discountTextOpacity,
              marginTop: 20,
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 28,
              color: "#bbb",
              lineHeight: 1.5,
            }}
          >
            No hidden commissions.
            <br />
            No escalator.{" "}
            <span style={{ color: "#4ade80", fontWeight: 600 }}>
              Fixed payment.
            </span>
          </div>
        </div>
      )}

      {/* Fixed monthly payment */}
      {frame >= 360 && (
        <div
          style={{
            opacity: fixedAppear,
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 52,
              fontWeight: 800,
              color: "#f5f5f5",
            }}
          >
            ~$175/mo
          </div>
          <div
            style={{
              fontSize: 40,
              transform: `scale(${lockBounce})`,
            }}
          >
            🔒
          </div>
        </div>
      )}

      {/* 5-Year Timeline */}
      {frame >= 450 && (
        <div
          style={{
            opacity: timelineAppear,
            marginTop: 50,
            width: "100%",
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 28,
              fontWeight: 600,
              color: "#f5f5f5",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Your path to ownership:
          </div>

          {/* Timeline bar */}
          <div
            style={{
              position: "relative",
              height: 8,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 4,
              margin: "0 20px",
            }}
          >
            <div
              style={{
                height: 8,
                width: `${timelineProgress * 100}%`,
                backgroundColor: "#4ade80",
                borderRadius: 4,
                boxShadow: "0 0 20px rgba(46,204,113,0.5)",
              }}
            />
            {/* Year markers */}
            {[1, 2, 3, 4, 5].map((yr) => (
              <div
                key={yr}
                style={{
                  position: "absolute",
                  left: `${(yr / 5) * 100}%`,
                  top: -30,
                  transform: "translateX(-50%)",
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 20,
                  color: timelineProgress >= yr / 5 ? "#4ade80" : "#555",
                  fontWeight: yr === 5 ? 700 : 400,
                }}
              >
                Yr {yr}
              </div>
            ))}
          </div>

          {/* Year 5 glow */}
          {timelineProgress >= 1 && (
            <div
              style={{
                textAlign: "right",
                marginTop: 16,
                marginRight: 20,
              }}
            >
              <span
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 22,
                  color: "#4ade80",
                  fontWeight: 600,
                }}
              >
                ★ OWNERSHIP TRANSFERRED
              </span>
            </div>
          )}
        </div>
      )}

      {/* Ownership text */}
      <div
        style={{
          opacity: ownTextOpacity,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 38,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.3,
          }}
        >
          After 5 years, they send you
          <br />
          the ownership documents.
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 32,
            fontWeight: 600,
            color: "#4ade80",
            marginTop: 12,
          }}
        >
          The system is yours.
        </div>
      </div>

      {/* Comparison table */}
      {frame >= 660 && (
        <div
          style={{
            opacity: tableAppear,
            marginTop: 40,
            width: "100%",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "10px 16px",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: "#e74c3c",
                textAlign: "center",
              }}
            >
              PPA
            </div>
            <div
              style={{
                flex: 1,
                padding: "10px 16px",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: 20,
                fontWeight: 700,
                color: "#4ade80",
                textAlign: "center",
              }}
            >
              THIS PROGRAM
            </div>
          </div>

          {comparisonRows.map((row, i) => {
            const rowStart = 680 + i * 30;
            const rowOpacity = interpolate(
              frame,
              [rowStart, rowStart + 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <div
                key={i}
                style={{
                  opacity: rowOpacity,
                  display: "flex",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    backgroundColor: "rgba(231,76,60,0.08)",
                    borderRadius: 8,
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 22,
                    color: "#ccc",
                    textAlign: "center",
                  }}
                >
                  {row.ppa}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    backgroundColor: "rgba(46,204,113,0.08)",
                    borderRadius: 8,
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 22,
                    color: "#f5f5f5",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  {row.ours}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* "Same solar. Different deal." */}
      <div
        style={{
          opacity: closerOpacity,
          position: "absolute",
          bottom: 120,
          left: 60,
          right: 60,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 42,
            fontWeight: 700,
            color: "#f5f5f5",
          }}
        >
          Same solar.{" "}
          <span style={{ color: "#4ade80", fontStyle: "italic" }}>
            Completely different deal.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
