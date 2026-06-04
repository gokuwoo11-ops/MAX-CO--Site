"use client";

import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useState } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function OrderTransitionLink({
  href = "/start",
  children,
  className = ""
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  function go(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    if (pathname === href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (active) return;

    setActive(true);

    window.setTimeout(() => {
      router.push(href);
    }, 650);

    window.setTimeout(() => {
      setActive(false);
    }, 1600);
  }

  return (
    <>
      <a href={href} onClick={go} className={className}>
        {children}
      </a>

      {active ? (
        <div className="order-transition-overlay fixed inset-0 z-[999] grid min-h-screen place-items-center overflow-hidden bg-[#030403] px-6">
          <div className="absolute inset-0 carbon-grid opacity-75" />
          <div className="noise-layer" />
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--green-soft)] blur-3xl sm:h-[32rem] sm:w-[32rem]" />

          <div className="relative z-10 w-full max-w-[28rem]">
            <div className="order-transition-card relative overflow-hidden border border-white/12 bg-gradient-to-br from-[#111611] via-[#182018] to-black p-7 shadow-2xl shadow-black sm:p-9">
              <div className="absolute inset-y-7 left-7 w-1.5 bg-[var(--green)]" />
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border-[14px] border-white/10 border-t-[var(--green)] spin-disc" />
              <div className="absolute -bottom-14 right-10 h-32 w-32 rounded-full border border-[var(--green)]/30 bg-[var(--green-soft)] blur-sm" />

              <div className="relative pl-7">
                <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--green)]">
                  Opening order
                </p>

                <h2 className="luxury-font mt-7 text-4xl font-black leading-[0.95] text-white sm:text-5xl">
                  Project
                  <br />
                  Brief
                  <br />
                  Console
                </h2>

                <p className="mt-6 max-w-[18rem] text-sm leading-6 text-white/58">
                  Preparing the private website order page.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="border border-white/10 bg-white/[0.045] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                      Step
                    </p>
                    <p className="mt-1 text-sm font-bold text-white/75">
                      Brief
                    </p>
                  </div>

                  <div className="border border-[var(--green)]/35 bg-[var(--green-soft)] p-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--green)]">
                      Mode
                    </p>
                    <p className="mt-1 text-sm font-bold text-white/75">
                      Private
                    </p>
                  </div>
                </div>

                <div className="mt-7 h-1.5 overflow-hidden bg-white/10">
                  <div className="order-progress h-full bg-[var(--green)]" />
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[10px] font-black uppercase tracking-[0.28em] text-white/38">
              Website-only order system
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}