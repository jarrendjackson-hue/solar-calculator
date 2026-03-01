import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

const ESCALATOR_RATE = 0.035;
const START_PAYMENT = 185;

function getPayment(year: number) {
  return Math.round(START_PAYMENT * Math.pow(1 + ESCALATOR_RATE, year - 1));
}

function getTotalCost() {
  let total = 0;
  for (let y = 1; y <= 25; y++) {
    total += getPayment(y) * 12;
  }
  return total;
}

const milestones = [
  { year: 1, label: "Today" },
  { year: 5, label: "Year 5" },
  { year: 10, label: "Year 10" },
  { year: 15, label: "Year 15" },
  { year: 25, label: "Year 25" },
];

export const PpaTrap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 510 frames total for this scene

  // "If you signed a PPA..." — fades in at start
  const introOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });
  const introY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateRight: "clamp",
  });

  // "there's a clause most people skip" — at frame 50
  const clauseOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fine print highlight — frame 90
  const highlightOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "3-5% annual escalator" text — frame 110
  const escalatorTextOpacity = interpolate(frame, [110, 135], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Payment milestones — stagger from frame 150
  const milestonesStart = 150;

  // Total counter — starts at frame 340
  const counterStart = 340;
  const counterProgress = interpolate(frame, [counterStart, counterStart + 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const totalCost = getTotalCost();
  const displayTotal = Math.round(counterProgress * totalCost);

  // "You'll pay over $73,000..." — frame 440
  const neverOwnOpacity = interpolate(frame, [440, 465], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const neverOwnY = interpolate(frame, [440, 465], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Red background pulse intensity
  const redPulse = interpolate(
    frame,
    [150, 300, 450, 510],
    [0, 0.05, 0.1, 0.15],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        padding: "60px",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Red ambient glow — grows as tension builds */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center bottom, rgba(231,76,60,${redPulse}) 0%, transparent 70%)`,
        }}
      />

      {/* Intro text */}
      <div
        style={{
          opacity: introOpacity,
          transform: `translateY(${introY}px)`,
          textAlign: "center",
          marginTop: 180,
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 42,
            fontWeight: 600,
            color: "#f5f5f5",
            lineHeight: 1.4,
          }}
        >
          If you signed a PPA...
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 36,
            fontWeight: 400,
            color: "#999",
            lineHeight: 1.4,
            marginTop: 16,
            opacity: clauseOpacity,
          }}
        >
          there's a clause most people skip.
        </div>
      </div>

      {/* Escalator clause highlight */}
      <div
        style={{
          opacity: highlightOpacity,
          marginTop: 60,
          padding: "24px 36px",
          border: "2px solid rgba(231,76,60,0.5)",
          borderRadius: 12,
          backgroundColor: "rgba(231,76,60,0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 28,
            color: "#999",
            marginBottom: 8,
          }}
        >
          Section 4.2 — Payment Adjustment
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 32,
            fontWeight: 700,
            color: "#ff6b5a",
            opacity: escalatorTextOpacity,
          }}
        >
          "3-5% annual escalator"
        </div>
        <div
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 26,
            color: "#999",
            marginTop: 8,
            opacity: escalatorTextOpacity,
          }}
        >
          Every year, your payment goes up.
        </div>
      </div>

      {/* Payment milestones */}
      <div
        style={{
          marginTop: 60,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {milestones.map((m, i) => {
          const stagger = milestonesStart + i * 35;
          const opacity = interpolate(frame, [stagger, stagger + 25], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = interpolate(frame, [stagger, stagger + 25], [-40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const payment = getPayment(m.year);
          const barWidth = interpolate(payment, [185, 390], [30, 95], {
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={m.year}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: 24,
                  color: "#777",
                  width: 90,
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  height: 44,
                  width: `${barWidth}%`,
                  background: `linear-gradient(90deg, rgba(231,76,60,0.7), rgba(231,76,60,${0.4 + i * 0.12}))`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 16,
                  transition: "width 0.3s",
                }}
              >
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  ${payment}/mo
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 25-Year Total Counter */}
      {frame > counterStart && (
        <div
          style={{
            marginTop: 50,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 26,
              color: "#777",
              marginBottom: 8,
            }}
          >
            25-YEAR TOTAL
          </div>
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: 72,
              fontWeight: 800,
              color: "#e74c3c",
              letterSpacing: "-2px",
            }}
          >
            ${displayTotal.toLocaleString()}
          </div>
        </div>
      )}

      {/* "Never own" kicker */}
      <div
        style={{
          opacity: neverOwnOpacity,
          transform: `translateY(${neverOwnY}px)`,
          textAlign: "center",
          marginTop: 40,
          position: "absolute",
          bottom: 180,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 40,
            fontWeight: 700,
            color: "#f5f5f5",
            lineHeight: 1.3,
          }}
        >
          You'll pay over{" "}
          <span style={{ color: "#e74c3c" }}>$73,000</span>
          <br />
          for a system you will{" "}
          <span style={{ color: "#e74c3c", fontStyle: "italic" }}>
            never own.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
