import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { ContactCard } from "@/components/marketing/ContactCard";
import { COMPANY, GOVERNING_LAW, GOVERNING_COURTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of Beam.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of service" updated="29 May 2026">
      <p>
        These terms of service (&quot;Terms&quot;) govern your access to and use
        of Beam, a web application provided by {COMPANY} (&quot;Beam Labs&quot;,
        &quot;we&quot;, &quot;us&quot;). By creating an account or using Beam,
        you agree to these Terms. If you do not agree, do not use Beam.
      </p>

      <h2>1. Your account</h2>
      <p>
        You must provide a valid email address to create an account and are
        responsible for keeping your login credentials secure. You are
        responsible for all activity that happens under your account. You must
        be at least 16 years old, or the age of digital consent in your
        jurisdiction, to use Beam.
      </p>

      <h2>2. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use Beam for any unlawful purpose or in violation of these Terms.</li>
        <li>
          Attempt to gain unauthorised access to other users&apos; accounts or
          to our systems.
        </li>
        <li>
          Interfere with or disrupt the service, or attempt to circumvent any
          rate limits or security measures.
        </li>
        <li>
          Upload content that infringes the rights of others or that is
          unlawful, harmful, or abusive.
        </li>
        <li>
          Use the AI assistant to generate content that violates applicable law
          or the acceptable-use policies of our AI provider.
        </li>
      </ul>

      <h2>3. Your content</h2>
      <p>
        You retain ownership of the notes, todos, and messages you create in
        Beam (&quot;Your Content&quot;). You grant us a limited licence to store
        and process Your Content solely to operate the service and to power your
        own AI assistant. We do not use Your Content to train AI models. See our{" "}
        <a href="/privacy">privacy policy</a> for details.
      </p>

      <h2>4. Subscription and billing</h2>
      <p>
        Beam is offered on a paid subscription basis. Prices are shown on our{" "}
        <a href="/pricing">pricing page</a> and are billed in advance on a
        recurring basis (monthly or annually) through our payment processor,
        Stripe. By subscribing, you authorise us to charge your payment method
        on each renewal date until you cancel. Applicable taxes may be added.
      </p>
      <p>
        We may change our prices with reasonable notice. Price changes take
        effect at your next renewal.
      </p>

      <h2>5. Cancellation</h2>
      <p>
        You may cancel your subscription at any time from your account&apos;s
        billing portal. Your subscription remains active until the end of the
        current billing period, after which it will not renew. See our{" "}
        <a href="/refunds">refund and cancellation policy</a> for more.
      </p>

      <h2>6. Availability and changes</h2>
      <p>
        We aim to keep Beam available and reliable but do not guarantee
        uninterrupted access. We may modify, suspend, or discontinue features
        from time to time. We will give reasonable notice of material changes
        where practical.
      </p>

      <h2>7. Disclaimer</h2>
      <p>
        Beam is provided &quot;as is&quot; and &quot;as available&quot;. The AI
        assistant can make mistakes and may produce inaccurate information; you
        should not rely on it as professional advice. To the fullest extent
        permitted by law, we disclaim all warranties, express or implied,
        including fitness for a particular purpose.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {COMPANY} will not be liable for
        any indirect, incidental, special, or consequential damages, or for any
        loss of data, profits, or revenue, arising from your use of Beam. Our
        total liability for any claim relating to the service is limited to the
        amount you paid us in the twelve months before the claim arose.
      </p>

      <h2>9. Termination</h2>
      <p>
        We may suspend or terminate your access if you breach these Terms. You
        may stop using Beam and delete your account at any time.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of {GOVERNING_LAW}, without regard
        to conflict-of-law principles. Any disputes will be subject to the
        exclusive jurisdiction of {GOVERNING_COURTS}.
      </p>

      <h2>11. Contact</h2>
      <p>Questions about these Terms? Reach us at:</p>
      <ContactCard />
    </LegalLayout>
  );
}
