import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { ContactCard } from "@/components/marketing/ContactCard";
import { COMPANY, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Beam collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy policy" updated="29 May 2026">
      <p>
        This privacy policy explains how {COMPANY} (&quot;Beam Labs&quot;,
        &quot;we&quot;) collects, uses, and protects your information when you
        use Beam. We&apos;ve tried to keep it plain. If anything is unclear,
        contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Data we collect</h2>
      <ul>
        <li>
          <strong>Account information.</strong> Your email address and
          authentication details, handled by our auth provider.
        </li>
        <li>
          <strong>Your content.</strong> The notes, todos, and assistant
          messages you create in Beam.
        </li>
        <li>
          <strong>Billing information.</strong> Subscription status and a
          customer identifier from Stripe. We never see or store your full card
          details — Stripe handles payments.
        </li>
        <li>
          <strong>Usage information.</strong> Basic technical data such as log
          and device information needed to operate and secure the service.
        </li>
      </ul>

      <h2>How we use your data</h2>
      <ul>
        <li>To operate, maintain, and secure the Beam service.</li>
        <li>
          To power <strong>your own</strong> AI assistant. When you message
          Beam, your current note, open todos, and recent chat are sent to our
          AI provider to generate a reply for you, and for no other purpose.
        </li>
        <li>To process subscriptions and billing.</li>
        <li>To respond to your support requests.</li>
      </ul>

      <h2>What we do not do</h2>
      <p>
        <strong>
          We do not use your content to train AI models — ours or anyone
          else&apos;s.
        </strong>{" "}
        We do not sell your personal information. We do not show you third-party
        advertising. Your notes are used to provide the service to you, and
        nothing more.
      </p>

      <h2>Third-party processors</h2>
      <p>
        We rely on a small number of trusted providers to run Beam. Each
        processes data only as needed to provide its service:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — database and authentication (stores your
          account and content).
        </li>
        <li>
          <strong>Stripe</strong> — subscription billing and payment processing.
        </li>
        <li>
          <strong>Anthropic</strong> — the AI model that powers the Beam
          assistant. Content sent to generate replies is not used to train
          models.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use strictly necessary cookies to run Beam, and optional cookies only
        with your consent. For the full breakdown and your regional choices
        (EU/UK, US, and Canada), see our <a href="/cookies">cookie policy</a>.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep your content for as long as your account is active. When you
        delete a note, todo, or message it is removed from your workspace. When
        you delete your account, we delete your content within a reasonable
        period, except where we must retain limited records to meet legal or
        accounting obligations.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        export, or delete your personal data, and to object to or restrict
        certain processing. You can delete your content at any time from within
        Beam. To make any other request, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
        respond within the time required by applicable law.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard measures to protect your data, including
        encryption in transit and access controls that ensure you can only
        access your own rows of data. No system is perfectly secure, but we work
        to keep your information safe.
      </p>

      <h2>International transfers</h2>
      <p>
        Your data may be processed in countries other than your own by the
        providers listed above. Where required, appropriate safeguards are in
        place for such transfers.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We will post the updated
        version here and revise the &quot;last updated&quot; date above.
      </p>

      <h2>Contact</h2>
      <p>For privacy questions or requests, get in touch:</p>
      <ContactCard />
    </LegalLayout>
  );
}
