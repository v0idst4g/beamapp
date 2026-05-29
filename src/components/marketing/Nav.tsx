"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-beam flex h-16 items-center justify-between">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="mr-1 hidden items-center md:flex">
            {[
              { href: "/features", label: "Features" },
              { href: "/pricing", label: "Pricing" },
              { href: "/faq", label: "FAQ" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            Log in
          </Link>
          <Link href="/signup" className="btn-accent px-4 py-2 text-sm">
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
