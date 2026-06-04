import Link from "next/link";
import { site } from "../lib/site";
import { OrderTransitionLink } from "./OrderTransitionLink";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="luxury-font text-3xl font-black">{site.fullName}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
            No phone calls, no WhatsApp, no SMS. Orders and communication happen
            privately through the website order page and chat.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
          <Link href="/" className="hover:text-[var(--green)]">Home</Link>
          <Link href="/details" className="hover:text-[var(--green)]">Details</Link>
          <OrderTransitionLink href="/start" className="hover:text-[var(--green)]">
            Order
          </OrderTransitionLink>
        </div>
      </div>
    </footer>
  );
}
