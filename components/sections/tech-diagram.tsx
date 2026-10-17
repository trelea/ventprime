/**
 * TECH cross-section diagram.
 *
 * Shows natural draft ventilation:
 *  1 — Air intake valve placed low, near the heating source (radiator).
 *  2 — Air exhaust in the upper area of the room.
 */
export function TechDiagram({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 520 340"
      role="img"
      aria-label={alt}
      className="h-auto w-full"
    >
      <defs>
        <marker
          id="arrow-out"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand-blue)" />
        </marker>
        <marker
          id="arrow-in"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <linearGradient id="warm-rise" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--brand-blue)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* House roof & room envelope */}
      <path
        d="M50 135 L260 35 L470 135"
        fill="none"
        stroke="var(--brand-blue-dark)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="70"
        y="135"
        width="380"
        height="165"
        rx="6"
        fill="var(--surface)"
        stroke="var(--brand-blue-dark)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Window above radiator on left wall */}
      <rect
        x="96"
        y="155"
        width="74"
        height="58"
        rx="4"
        fill="#e0f2fe"
        stroke="var(--brand-blue)"
        strokeWidth="2"
      />
      <line
        x1="133"
        y1="155"
        x2="133"
        y2="213"
        stroke="var(--brand-blue)"
        strokeWidth="1.5"
      />

      {/* Radiator (heating source) placed low on left side */}
      <g>
        <rect
          x="100"
          y="236"
          width="68"
          height="46"
          rx="5"
          fill="#fee2e2"
          stroke="#ef4444"
          strokeWidth="2"
        />
        {[0, 1, 2, 3, 4].map((fin) => (
          <line
            key={fin}
            x1={112 + fin * 11}
            y1="242"
            x2={112 + fin * 11}
            y2="276"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* 1 — Low air intake valve near the radiator */}
      <rect
        x="56"
        y="248"
        width="28"
        height="20"
        rx="4"
        fill="#ecfdf5"
        stroke="#10b981"
        strokeWidth="2.5"
      />

      {/* 2 — Upper air exhaust channel */}
      <rect
        x="436"
        y="154"
        width="28"
        height="20"
        rx="4"
        fill="#dbeafe"
        stroke="var(--brand-blue)"
        strokeWidth="2.5"
      />

      {/* Fresh air entering through valve (1) */}
      <path
        d="M 22 258 L 88 258"
        stroke="#10b981"
        strokeWidth="4"
        strokeLinecap="round"
        markerEnd="url(#arrow-in)"
        className="flow-arrow"
      />

      {/* Air mixing with warm air from radiator and rising toward upper exhaust (2) */}
      <path
        d="M 140 256 C 210 256, 235 190, 320 172 C 365 164, 395 164, 426 164"
        fill="none"
        stroke="url(#warm-rise)"
        strokeWidth="3.5"
        strokeDasharray="7 6"
        strokeLinecap="round"
        markerEnd="url(#arrow-out)"
        className="flow-arrow"
        style={{ animationDelay: "0.35s" }}
      />
      <path
        d="M 150 232 C 215 215, 260 165, 355 154"
        fill="none"
        stroke="url(#warm-rise)"
        strokeWidth="2.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
        className="flow-arrow"
        style={{ animationDelay: "0.7s" }}
      />

      {/* Warm humid air exiting at upper exhaust (2) */}
      <path
        d="M 442 164 L 502 164"
        stroke="var(--brand-blue)"
        strokeWidth="4"
        strokeLinecap="round"
        markerEnd="url(#arrow-out)"
        className="flow-arrow"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Numbered Callout 1 — Intake near heating source */}
      <g>
        <circle cx="70" cy="224" r="15" fill="#10b981" />
        <text
          x="70"
          y="229"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#ffffff"
        >
          1
        </text>
      </g>

      {/* Numbered Callout 2 — Exhaust in the upper part */}
      <g>
        <circle cx="450" cy="130" r="15" fill="var(--brand-blue)" />
        <text
          x="450"
          y="135"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#ffffff"
        >
          2
        </text>
      </g>
    </svg>
  );
}

/**
 * Arrow animation. `prefers-reduced-motion` in globals.css already collapses
 * animation duration to ~0, which freezes the arrows in place.
 */
export function TechDiagramStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes ventprime-dash {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .flow-arrow { animation: ventprime-dash 2.4s ease-in-out infinite; }
        `,
      }}
    />
  );
}
