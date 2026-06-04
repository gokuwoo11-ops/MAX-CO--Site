import Link from "next/link";
import { site } from "../lib/site";
import { OrderTransitionLink } from "./OrderTransitionLink";

export function Navigation() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 px-3 py-3 md:px-4 md:py-4">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/10 bg-black/65 px-4 py-3 shadow-2xl shadow-black/35 backdrop-blur-2xl md:rounded-none md:px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--green)] text-xs font-black text-[var(--green)] green-glow md:h-10 md:w-10 md:rounded-none md:text-sm">
              MC
            </span>

            <span>
              <span className="luxury-font block text-lg font-black leading-none text-white md:text-xl">
                {site.name}
              </span>
              <span className="block text-[9px] uppercase tracking-[0.22em] text-white/38 md:text-[10px]">
                Project Studio
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
            className="rounded-xl border border-[var(--green)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--green)] transition hover:bg-[var(--green)] hover:text-black md:rounded-none md:px-5 md:text-xs"
          >
            Order
          </OrderTransitionLink>
        </nav>
      </header>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-3 left-3 right-3 z-50 grid grid-cols-3 rounded-2xl border border-white/10 bg-black/75 p-2 text-center text-[10px] font-black uppercase tracking-[0.13em] text-white/52 backdrop-blur-2xl md:hidden">
        <Link href="/" className="rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white">
          Home
        </Link>

        <Link href="/account" className="rounded-xl px-3 py-3 hover:bg-white/10 hover:text-white">
          Account
        </Link>

        <OrderTransitionLink
          href="/start"
          className="rounded-xl bg-[var(--green)] px-3 py-3 text-black"
        >
          Order
        </OrderTransitionLink>
      </nav>
    </>
  );
}