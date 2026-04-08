import type { Metadata } from "next";

export const runtime = "edge";

export default function Icon() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="warm" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#9a3412" />
      <stop offset="1" stop-color="#b45309" />
    </linearGradient>
  </defs>
  <rect x="6" y="10" width="52" height="48" rx="8" fill="#f8f1e6" stroke="#3f2c1f" stroke-width="3" />
  <rect x="6" y="16" width="52" height="12" rx="6" fill="url(#warm)" />
  <rect x="14" y="6" width="8" height="10" rx="4" fill="#3f2c1f" />
  <rect x="42" y="6" width="8" height="10" rx="4" fill="#3f2c1f" />
  <g fill="#3f2c1f">
    <rect x="18" y="32" width="10" height="8" rx="2" />
    <rect x="36" y="32" width="10" height="8" rx="2" />
    <rect x="18" y="44" width="10" height="8" rx="2" />
    <rect x="36" y="44" width="10" height="8" rx="2" />
  </g>
</svg>`,
    {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    }
  );
}
