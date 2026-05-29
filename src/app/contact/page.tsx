import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { ContactCard } from "@/components/marketing/ContactCard";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Beam Labs.",
};

export default function ContactPage() {
  return (
    <LegalLayout title="Contact">
      <p>
        Beam is made by <strong>{COMPANY}</strong>. We&apos;re a small team and
        we read everything you send — for support, billing, privacy requests, or
        anything else, reach us here. We aim to reply within a couple of
        business days.
      </p>

      <ContactCard />

      <h2>Legal &amp; privacy</h2>
      <p>
        See our <a href="/terms">terms of service</a>,{" "}
        <a href="/privacy">privacy policy</a>, and{" "}
        <a href="/refunds">refund &amp; cancellation policy</a>.
      </p>
    </LegalLayout>
  );
}
