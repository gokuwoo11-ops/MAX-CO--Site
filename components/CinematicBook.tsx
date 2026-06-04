"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Link from "next/link";

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

const labels = [
  ["FORM", "BRIEF"],
  ["PRIVATE", "CHAT"],
  ["PROJECT", "FLOW"],
  ["PDF", "READY"]
];

export function CinematicBook() {
  const stageRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const max = rect.height - window.innerHeight;
      setProgress(clamp(max <= 0 ? 0 : -rect.top / max));
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const open = clamp(progress * 1.7);
  const lift = clamp((progress - 0.32) * 1.55);
  const reveal = clamp((progress - 0.52) * 1.55);

  const coverStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, 36px) rotateX(${62 - lift * 18}deg) rotateZ(${-28 + lift * 10}deg) rotateY(${-150 * open}deg)`
  };

  const pageStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, ${8 + lift * 44}px) rotateX(${62 - lift * 18}deg) rotateZ(${-26 + lift * 10}deg) scale(${1 + reveal * 0.04})`
  };

  const baseStyle: CSSProperties = {
    transform: `translate3d(-50%, -50%, 0) rotateX(${62 - lift * 18}deg) rotateZ(${-26 + lift * 10}deg)`
  };

  return (
    <section ref={stageRef} className="relative h-[250vh] overflow-clip border-y border-white/10">
      <div className="absolute inset-0 carbon-grid" />
      <div className="noise-layer" />

      <div className="sticky top-0 flex h-screen items-center px-6 py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div className="relative z-20">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
              Website-only system
            </p>
            <h2 className="display-font mt-4 max-w-xl text-6xl leading-[0.9] text-white md:text-8xl">
              The order opens into a private chat.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/56">
              Students fill a project brief inside the site. After submission,
              they get a private order room where the owner can reply.
            </p>

            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3">
              {labels.map((item) => (
                <div key={item.join("-")} className="border border-white/10 bg-white/[0.035] p-4">
                  <p className="display-font text-3xl leading-none">{item[0]}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.22em] text-[var(--green)]">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="perspective-stage relative z-10 h-[620px]">
            <div className="absolute left-1/2 top-[56%] h-24 w-[540px] -translate-x-1/2 rounded-full bg-black/70 blur-3xl" />

            <div
              className="preserve-3d absolute left-1/2 top-1/2 h-[430px] w-[320px] origin-left border border-white/10 bg-[#101310] shadow-2xl shadow-black"
              style={baseStyle}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
              <div className="absolute inset-y-0 left-6 w-2 bg-white/8" />
            </div>

            <div
              className="paper-lines preserve-3d absolute left-1/2 top-1/2 h-[420px] w-[310px] border border-black/10 p-7 text-slate-950 shadow-2xl"
              style={pageStyle}
            >
              <p className="text-xs font-black uppercase tracking-[0.28em] text-slate-500">
                Private Room
              </p>
              <h3 className="display-font mt-5 text-6xl leading-[0.86] text-slate-950">
                Order
                <br />
                Chat
              </h3>

              <div className="mt-7 space-y-3">
                <div className="ml-auto max-w-[75%] bg-slate-950 p-3 text-xs leading-5 text-white">
                  I submitted my topic and deadline.
                </div>
                <div className="max-w-[82%] border border-slate-950/15 bg-white/60 p-3 text-xs leading-5 text-slate-950">
                  Got it. I will check the structure and reply here.
                </div>
              </div>

              <div className="mt-6 border-l-4 border-[var(--green)] bg-white/50 p-4">
                <p className="text-sm font-bold leading-5">
                  No phone number. No WhatsApp. Website-only communication.
                </p>
              </div>
            </div>

            <div
              className="preserve-3d absolute left-1/2 top-1/2 h-[440px] w-[330px] origin-left border border-white/20 bg-gradient-to-br from-[#121612] via-[#1a211a] to-[#050705] p-8 shadow-2xl shadow-black"
              style={coverStyle}
            >
              <div className="absolute inset-y-10 left-8 w-2 bg-[var(--green)]/70" />
              <div className="absolute right-8 top-8 border border-[var(--green)] px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[var(--green)]">
                Private
              </div>

              <p className="text-xs font-black uppercase tracking-[0.32em] text-[var(--green)]">
                MAX & Co
              </p>
              <h3 className="display-font mt-10 text-7xl leading-[0.84]">
                Order
                <br />
                Brief
                <br />
                System
              </h3>
              <p className="mt-6 max-w-[13rem] text-sm leading-6 text-white/55">
                Form submission, database storage and private order chat.
              </p>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="mb-3 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] text-white/40">
                  <span>Open</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10">
                  <div
                    className="h-full bg-[var(--green)]"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div
              className="absolute right-[4%] top-[18%] border border-[var(--green)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--green)] transition"
              style={{ opacity: reveal }}
            >
              Private chat
            </div>
          </div>
        </div>

        <Link
          href="/start"
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 border border-[var(--green)] bg-[var(--green)] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
        >
          Start Order
        </Link>
      </div>
    </section>
  );
}
