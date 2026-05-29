import { COMPANY, CONTACT_EMAIL, ADDRESS_LINES } from "@/lib/constants";
import { MailIcon, PinIcon } from "@/components/icons";

/**
 * A clean, readable contact block for the legal pages — company + address on
 * separate lines, an amber email link, with small accent icons.
 */
export function ContactCard() {
  return (
    <div className="my-5 grid gap-5 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2 sm:gap-4">
      <div className="flex gap-3">
        <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div className="text-sm leading-relaxed">
          <div className="text-xs uppercase tracking-wider text-text-faint">
            Address
          </div>
          <div className="mt-1.5 font-medium text-text">{COMPANY}</div>
          {ADDRESS_LINES.map((line) => (
            <div key={line} className="text-text-muted">
              {line}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 sm:border-l sm:border-border sm:pl-5">
        <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <div className="text-sm leading-relaxed">
          <div className="text-xs uppercase tracking-wider text-text-faint">
            Email
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1.5 inline-block font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
