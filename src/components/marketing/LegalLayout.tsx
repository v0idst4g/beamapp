import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container-beam max-w-3xl pb-28 pt-32">
        <h1 className="text-3xl font-medium tracking-tight text-text sm:text-4xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-3 text-sm text-text-faint">Last updated {updated}</p>
        )}
        <div className="legal-prose mt-10">{children}</div>
      </main>
      <Footer />
    </>
  );
}
