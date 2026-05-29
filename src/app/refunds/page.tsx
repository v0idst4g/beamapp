import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { ContactCard } from "@/components/marketing/ContactCard";
import { CONTACT_EMAIL, REFUND_WINDOW_DAYS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Refund and cancellation policy",
  description: "How cancellations and refunds work at Beam.",
};

export default function RefundsPage() {
  return (
    <LegalLayout title="Refund & cancellation policy" updated="29 May 2026">
      <p>
        We want Beam to be worth its price. This policy explains how to cancel
        and how we handle refunds. It should be read together with our{" "}
        <a href="/terms">terms of service</a>.
      </p>

      <h2>How to cancel</h2>
      <p>
        You can cancel your subscription at any time. Open Beam, go to your
        account area, and click <strong>Manage billing</strong> to reach the
        secure Stripe customer portal, where you can cancel in a couple of
        clicks. You can also reach the portal from any billing email Stripe
        sends you.
      </p>

      <h2>What happens when you cancel</h2>
      <ul>
        <li>
          Your subscription stays active until the end of the billing period
          you&apos;ve already paid for.
        </li>
        <li>
          At the end of that period, your subscription will not renew and you
          will not be charged again.
        </li>
        <li>
          Your notes and todos remain in your account so you can export or
          delete them. You can delete your account whenever you like.
        </li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Because you can cancel at any time and keep access until the end of the
        period you paid for, we generally do not provide partial refunds for the
        unused portion of a billing period.
      </p>
      <p>
        That said, we&apos;re reasonable. If you were charged in error, were
        billed after cancelling, or are within {REFUND_WINDOW_DAYS} days of your
        first payment and Beam isn&apos;t right for you, contact us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we&apos;ll
        work with you on a fair resolution, which may include a full or partial
        refund at our
        discretion. Nothing in this policy limits any statutory refund or
        cancellation rights you may have under the consumer laws of your
        jurisdiction.
      </p>

      <h2>Annual plans</h2>
      <p>
        Annual subscriptions are billed once per year. The same cancellation and
        refund principles above apply; cancelling stops the next annual renewal.
      </p>

      <h2>Contact</h2>
      <p>For billing questions or refund requests, get in touch:</p>
      <ContactCard />
    </LegalLayout>
  );
}
