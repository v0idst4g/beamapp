"use client";

import Link from "next/link";
import { useId } from "react";

/**
 * The Beam mark — a focused cone of warm light, echoing the hero god-ray.
 * No container chrome; the beam itself is the logo. Size it with Tailwind
 * height/width classes, which override the intrinsic 24px, so it scales
 * cleanly everywhere.
 */
export function BeamMark({ className = "" }: { className?: string }) {
  const uid = useId();
  const gid = `beam-cone-${uid}`;
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={gid}
          x1="12"
          y1="4.5"
          x2="12"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFB84D" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#FFB84D" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFB84D" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <g transform="rotate(8 12 12)">
        {/* pool of light where the beam lands */}
        <ellipse cx="12" cy="20" rx="6" ry="1.7" fill="#FFB84D" opacity="0.16" />
        {/* the beam */}
        <path d="M12 5 L17.6 19.4 L6.4 19.4 Z" fill={`url(#${gid})`} />
        {/* soft halo + bright source */}
        <circle cx="12" cy="5" r="3.1" fill="#FFB84D" opacity="0.38" />
        <circle cx="12" cy="5" r="1.85" fill="#FFC76B" />
      </g>
    </svg>
  );
}

export function Logo({
  href = "/",
  className = "",
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 ${className}`}
    >
      <BeamMark className="h-[26px] w-[26px]" />
      <span className="text-[19px] font-medium leading-none tracking-[-0.02em] text-accent">
        Beam.
      </span>
    </Link>
  );
}
