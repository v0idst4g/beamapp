import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { COMPANY } from "@/lib/constants";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Log in", href: "/login" },
      { label: "Get started", href: "/signup" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
      { label: "Refunds", href: "/refunds" },
    ],
  },
  {
    title: "Company",
    links: [{ label: "Contact", href: "/contact" }],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-beam py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              A calm daily workspace for your notes, todos, and a mind that
              reads them.
            </p>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-text-faint">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-text-faint">© {COMPANY}</p>
          <div className="flex items-center gap-5">
            <CookieSettingsButton className="text-sm text-text-faint transition-colors hover:text-text-muted">
              Cookie settings
            </CookieSettingsButton>
            <p className="text-sm text-text-faint">Made calmly, for focused days.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
