/**
 * TECH cross-section diagram (AGENTS.md §5.5 Block A).
 *
 * Inline SVG rather than an image so the airflow arrows can be animated in CSS
 * and the whole thing stays a few KB. It is decorative — the numbered steps
 * beside it carry the meaning, and the section has a text description above.
 */
export function TechDiagram({ alt }: { alt: string }) {
  return (
    <svg
      viewBox="0 0 480 320"
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brand-green)" />
        </marker>
      </defs>

      {/* House envelope */}
      <path
        d="M60 160 L240 50 L420 160"
        fill="none"
        stroke="var(--brand-blue-dark)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="60"
        y="160"
        width="360"
        height="110"
        fill="var(--surface)"
        stroke="var(--brand-blue-dark)"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Supply channel at floor level — cool air in */}
      <rect
        x="90"
        y="236"
        width="120"
        height="16"
        rx="4"
        fill="var(--brand-green-soft)"
        stroke="var(--brand-green)"
        strokeWidth="2"
      />

      {/* Exhaust channel near the ridge — warm, damp air out */}
      <rect
        x="252"
        y="112"
        width="120"
        height="16"
        rx="4"
        fill="#dbeafe"
        stroke="var(--brand-blue)"
        strokeWidth="2"
      />

      {/* Inbound airflow */}
      <g className="flow-in">
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${96 + i * 36} 244 L ${96 + i * 36} 200`}
            stroke="var(--brand-green)"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrow-in)"
            className="flow-arrow"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </g>

      {/* Outbound airflow */}
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${268 + i * 36} 100 L ${268 + i * 36} 58`}
            stroke="var(--brand-blue)"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrow-out)"
            className="flow-arrow"
            style={{ animationDelay: `${i * 0.4 + 0.2}s` }}
          />
        ))}
      </g>

      {/* Callout numbers */}
      {[
        { n: 1, x: 150, y: 262 },
        { n: 2, x: 312, y: 96 },
      ].map((callout) => (
        <g key={callout.n}>
          <circle
            cx={callout.x}
            cy={callout.y}
            r="14"
            fill="var(--brand-blue-dark)"
          />
          <text
            x={callout.x}
            y={callout.y + 5}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="#fff"
          >
            {callout.n}
          </text>
        </g>
      ))}
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
            0%, 100% { opacity: 0.25; }
            50% { opacity: 1; }
          }
          .flow-arrow { animation: ventprime-dash 2.4s ease-in-out infinite; }
        `,
      }}
    />
  );
}