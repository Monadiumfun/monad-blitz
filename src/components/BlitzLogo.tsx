import type { CSSProperties } from "react";

/** The Blitz lightning mark — colored via currentColor. */
function BlitzLogo({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 470 1796"
      className={className}
      style={style}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M392.764 9.91055C381.164 -7.28945 367.931 1.74389 362.764 8.41055L0.264479 855.911C-1.73552 869.111 8.09781 875.077 13.2645 876.411H140.764C152.364 879.211 154.931 889.244 154.764 893.911L76.7645 1784.91C86.7645 1801.31 99.5978 1794.41 104.764 1788.91L468.764 788.411C472.264 779.411 464.764 767.411 452.264 767.411H352.764C343.164 765.811 339.431 756.744 338.764 752.411L392.764 9.91055Z" />
    </svg>
  );
}

export default BlitzLogo;
