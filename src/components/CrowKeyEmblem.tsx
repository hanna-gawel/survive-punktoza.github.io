interface CrowKeyEmblemProps {
  className?: string;
}

/**
 * Stylized emblem of a raven/crow perched on stacked books holding a key —
 * honoring guerrilla open-access literature retrieval beyond library paywalls.
 */
export function CrowKeyEmblem({ className = 'w-11 h-11' }: CrowKeyEmblemProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Subtle badge halo */}
      <circle cx="32" cy="32" r="30" fill="#221A36" />
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="url(#crowRing)"
        strokeWidth="2"
        strokeOpacity="0.85"
      />

      {/* Stack of academic books */}
      <rect x="13" y="47" width="38" height="6" rx="2" fill="#0D8A85" />
      <rect x="16" y="48.5" width="32" height="1.5" rx="0.75" fill="#86EAE2" opacity="0.65" />
      <rect x="16" y="41" width="32" height="5.5" rx="2" fill="#6D44B8" />
      <rect x="19" y="42.5" width="26" height="1.5" rx="0.75" fill="#D5B8FF" opacity="0.7" />

      {/* Raven / Crow silhouette perched on books */}
      <path
        d="M21 41C21.5 34.5 25 27.5 31 23.5C33.2 22 34.8 18.8 36.2 17C38.4 14.4 42.5 14.5 44.3 17C45.3 18.4 45.2 20.5 44 21.8C41.8 24.1 40.5 27.2 39.2 31.3C37.9 35.4 35.1 38.6 31.2 40.2L31.8 41H21Z"
        fill="#FAF8FC"
      />
      {/* Tail feathers */}
      <path d="M21 38.5L14.5 42.5L22.5 41.2Z" fill="#D5B8FF" />
      {/* Wing detail */}
      <path
        d="M25.5 35.5C29.5 33.2 34 29.8 36.5 25.5"
        stroke="#6D44B8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="40.8" cy="18.2" r="1.35" fill="#221A36" />
      {/* Beak */}
      <path d="M44.5 18.1L51.5 19.6L44.2 21.2Z" fill="#F9844A" />
      {/* Feet perched on top book */}
      <path
        d="M28.5 39.5V41.6M32.5 39.5V41.6"
        stroke="#F9844A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Luminous Key held in beak */}
      <g>
        {/* Key bow (ring) */}
        <circle
          cx="49.5"
          cy="25.2"
          r="3.3"
          stroke="#FFB574"
          strokeWidth="2"
          fill="none"
        />
        {/* Key shaft hanging from beak */}
        <path
          d="M49.5 20.2V22M49.5 28.5V37.2M49.5 33.5H53M49.5 36.3H52.2"
          stroke="#FFB574"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <defs>
        <linearGradient
          id="crowRing"
          x1="6"
          y1="6"
          x2="58"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C6A4FF" />
          <stop offset="0.5" stopColor="#F9844A" />
          <stop offset="1" stopColor="#58D5CA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
