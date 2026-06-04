import Link from "next/link";
import { site } from "../lib/site";
import { OrderTransitionLink } from "./OrderTransitionLink";

export function Navigation() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border border-white/10 bg-black/55 px-5 py-3 shadow-2xl shadow-black/35 backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-[var(--green)] text-sm font-black text-[var(--green)] green-glow">
            MC
          </span>

          <span>
            <span className="luxury-font block text-xl font-black leading-none text-white">
              {site.name}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.24em] text-white/38 sm:block">
              Private Project Studio
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.22em] text-white/50 md:flex">
          <Link className="transition hover:text-[var(--green)]" href="/">
            Home
          </Link>

          <Link className="transition hover:text-[var(--green)]" href="/details">
            Details
          </Link>

          <Link className="transition hover:text-[var(--green)]" href="/account">
            My Account
          </Link>

          <OrderTransitionLink
            className="transition hover:text-[var(--green)]"
            href="/start"
          >
            Order
          </OrderTransitionLink>
        </div>

        <OrderTransitionLink
          href="/start"
          className="border border-[var(--green)] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--green)] transition hover:bg-[var(--green)] hover:text-black"
        >
          Order
        </OrderTransitionLink>
      </nav>
    </header>
  );
}