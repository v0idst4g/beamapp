import type { Metadata } from "next";
import { LegalLayout } from "@/components/marketing/LegalLayout";
import { ContactCard } from "@/components/marketing/ContactCard";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "How Beam uses cookies, and your choices under GDPR, US (CCPA/CPRA), and Canadian privacy law.",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie policy" updated="29 May 2026">
      <p>
        This policy explains how {COMPANY} uses cookies and similar technologies
        on Beam, and the choices you have. It should be read together with our{" "}
        <a href="/privacy">privacy policy</a>.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. We also use similar technologies such as local storage. We
        refer to all of these as &quot;cookies&quot; here.
      </p>

      <h2>The cookies we use</h2>
      <p>We keep this short, because Beam uses very few:</p>
      <ul>
        <li>
          <strong>Strictly necessary.</strong> Used to sign you in, keep you
          logged in (Supabase authentication), and process subscription payments
          (Stripe). The site can&apos;t work without these, so they don&apos;t
          require consent.
        </li>
        <li>
          <strong>Analytics (optional).</strong> If enabled, these help us
          understand how Beam is used so we can improve it. They are{" "}
          <strong>off unless you opt in</strong>.
        </li>
        <li>
          <strong>Marketing (optional).</strong> Used to measure or personalise
          any future marketing. They are <strong>off unless you opt in</strong>.
        </li>
      </ul>
      <p>
        We store your consent choice for 12 months. We do not use cookies to
        sell your personal information.
      </p>

      <h2>Managing your choices</h2>
      <p>
        You can change your preferences at any time:{" "}
        <CookieSettingsButton className="text-accent hover:text-accent-hover">
          open cookie settings
        </CookieSettingsButton>
        . You can also block or delete cookies in your browser settings, though
        strictly necessary cookies are needed for Beam to function.
      </p>

      <h2>Your rights by region</h2>

      <h3>European Union &amp; United Kingdom (GDPR / ePrivacy)</h3>
      <p>
        We ask for your consent before setting any non-essential cookies, and
        non-essential cookies are off by default. Our legal basis for optional
        cookies is your consent, which you can withdraw at any time via cookie
        settings. Strictly necessary cookies rely on our legitimate interest in
        operating the service. You also have rights to access, correct, delete,
        and port your data, and to lodge a complaint with your local data
        protection authority.
      </p>

      <h3>United States (CCPA / CPRA and similar state laws)</h3>
      <p>
        If you are a California resident (or in a state with comparable law),
        you have the right to know what personal information we collect, to
        request its deletion, to correct it, and to opt out of the
        &quot;sale&quot; or &quot;sharing&quot; of personal information and of
        targeted advertising.{" "}
        <strong>
          We do not sell or share your personal information, and we do not use
          it for cross-context behavioural advertising.
        </strong>{" "}
        Choosing &quot;reject non-essential&quot; in our banner, or enabling a
        Global Privacy Control (GPC) signal in your browser, opts you out of any
        optional cookies. We will not discriminate against you for exercising
        these rights.
      </p>

      <h3>Canada (PIPEDA &amp; Quebec Law 25)</h3>
      <p>
        We obtain your consent before using non-essential cookies and explain
        their purpose in plain language. You may withdraw consent at any time
        through cookie settings, and you have the right to access and correct
        your personal information. For Quebec residents, optional cookies that
        identify you are not activated by default, consistent with Law 25.
      </p>

      <h2>Third parties</h2>
      <p>
        Some necessary cookies are set by the providers that run core parts of
        Beam — <strong>Supabase</strong> (authentication) and{" "}
        <strong>Stripe</strong> (payments and fraud prevention). These process
        data on our behalf to deliver the service.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as our use of cookies changes. We&apos;ll post
        the new version here and update the date above.
      </p>

      <h2>Contact</h2>
      <p>For any questions about cookies or your privacy choices:</p>
      <ContactCard />
    </LegalLayout>
  );
}
