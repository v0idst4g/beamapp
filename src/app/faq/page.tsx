import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { ContactCard } from "@/components/marketing/ContactCard";
import { ChevronDownIcon, ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Beam — how it works, privacy, plans, and billing.",
};

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-accent hover:text-accent-hover">
      {children}
    </Link>
  );
}

function FaqItem({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="group border-b border-border">
      <summary className="flex items-center justify-between gap-4 py-4 text-[15px] font-medium text-text transition-colors hover:text-accent">
        <span>{q}</span>
        <ChevronDownIcon className="faq-chevron h-4 w-4 shrink-0 text-text-faint" />
      </summary>
      <div className="pb-5 pr-6 text-sm leading-relaxed text-text-muted">
        {children}
      </div>
    </details>
  );
}

function FaqGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-medium uppercase tracking-wider text-text-faint">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden pb-28 pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="beam-halo left-1/2 top-0 h-[320px] w-[600px] -translate-x-1/2 animate-halo-pulse" />
        </div>

        <div className="container-beam max-w-3xl">
          <div className="text-center">
            <p className="text-sm font-medium text-accent">FAQ</p>
            <h1 className="mt-3 text-balance text-4xl font-medium tracking-tight text-text sm:text-5xl">
              Questions, answered plainly
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted">
              The honest answers to what people ask most. If yours isn&apos;t
              here, just email us.
            </p>
          </div>

          <div className="mt-16 space-y-12">
            <FaqGroup title="About Beam">
              <FaqItem q="What is Beam?">
                Beam is a calm daily workspace that keeps today&apos;s note, your
                todos, and an AI assistant on a single page. It&apos;s built for
                focused, everyday thinking — not another tool to manage.
              </FaqItem>
              <FaqItem q="How is it different from a notes app or a to-do app?">
                Most tools make you choose between writing and doing, in separate
                apps. Beam puts your note and todos side by side and adds an
                assistant that can see both — so the thinking and the doing stay
                together. See the full <A href="/features">features</A>.
              </FaqItem>
              <FaqItem q="What can the Beam assistant actually do?">
                It reads today&apos;s note and your open todos and helps you act
                on them — suggest what to focus on, break a task down, or talk
                something through. It stays grounded in your day and won&apos;t
                invent facts about you.
              </FaqItem>
              <FaqItem q="Which AI model powers Beam?">
                Beam uses Anthropic&apos;s Claude models, called only from our
                server. Your note and todos are sent solely to generate your
                replies — never to train any AI model.
              </FaqItem>
              <FaqItem q="What devices does Beam work on?">
                Beam runs in your web browser and works well on a laptop.
                It&apos;s usable on mobile too, though it&apos;s designed first
                for a focused session at your desk.
              </FaqItem>
            </FaqGroup>

            <FaqGroup title="Privacy & your data">
              <FaqItem q="Is my data private?">
                Yes. Your notes and todos are used only to operate Beam and to
                power your own assistant. We don&apos;t sell your data and we
                don&apos;t show ads.
              </FaqItem>
              <FaqItem q="Do you train AI on my notes?">
                No. Your content is never used to train AI models — ours or
                anyone else&apos;s.
              </FaqItem>
              <FaqItem q="Where is my data stored?">
                In a secure Postgres database via Supabase, with row-level
                security so you can only ever access your own data. The full list
                of processors is in our <A href="/privacy">privacy policy</A>.
              </FaqItem>
              <FaqItem q="Can I delete my data?">
                Anytime. Delete a note, a todo, or your whole account and
                it&apos;s removed. More detail is in the{" "}
                <A href="/privacy">privacy policy</A>.
              </FaqItem>
              <FaqItem q="What about cookies?">
                Beam uses only strictly-necessary cookies to keep you signed in
                and process payments. Optional cookies are off unless you opt in
                — see the <A href="/cookies">cookie policy</A>.
              </FaqItem>
            </FaqGroup>

            <FaqGroup title="Plans & billing">
              <FaqItem q="How much does Beam cost?">
                £14.99 per month or £49.99 per year — one plan with every
                feature, no tiers. See <A href="/pricing">pricing</A>.
              </FaqItem>
              <FaqItem q="Is there a free trial?">
                There isn&apos;t a separate free trial right now. You can set up
                your account in a minute, and you can cancel anytime — our{" "}
                <A href="/refunds">refund policy</A> is reasonable if Beam
                isn&apos;t the right fit.
              </FaqItem>
              <FaqItem q="Can I cancel anytime?">
                Yes. Manage your subscription from the billing portal in your
                account; you keep access until the end of the period you&apos;ve
                paid for. Details in the{" "}
                <A href="/refunds">refund &amp; cancellation policy</A>.
              </FaqItem>
              <FaqItem q="How do I pay?">
                Securely through Stripe. We never see or store your full card
                details.
              </FaqItem>
            </FaqGroup>
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-surface p-7 text-center">
            <h2 className="text-lg font-medium text-text">
              Still have a question?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-text-muted">
              We&apos;re a small team and we read everything. Reach out and
              we&apos;ll get back to you within a couple of business days.
            </p>
            <div className="mt-5">
              <ContactCard />
            </div>
            <Link
              href="/signup"
              className="btn-accent mt-2 inline-flex px-5 py-3 text-sm"
            >
              Get started
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
