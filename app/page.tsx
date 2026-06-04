import Link from "next/link";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CinematicBook } from "../components/CinematicBook";
import { site } from "../lib/site";
import { OrderTransitionLink } from "../components/OrderTransitionLink";

const specs = [
  { value: "PRIVATE", label: "No Phone Contact" },
  { value: "FORM", label: "Project Brief" },
  { value: "CHAT", label: "Website Room" },
  { value: "DB", label: "Stored Order" }
];

const services = [
  "Assignment formatting",
  "Project records",
  "Science diagrams",
  "Observation tables",
  "PDF presentation",
  "Private chat"
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative min-h-screen overflow-hidden px-6 pb-14 pt-28">
        <div className="absolute inset-0 carbon-grid opacity-75" />
        <div className="noise-layer" />
        <div className="absolute left-[-7rem] top-40 h-72 w-72 rounded-full bg-[var(--green-soft)] blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.18fr_1.12fr_0.7fr] lg:items-center">
          <aside className="hidden h-full flex-col justify-center gap-10 lg:flex">
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-4">
                <p className="display-font vertical-word text-3xl leading-none text-white">
                  {spec.value}
                </p>
                <p className="vertical-word text-[10px] font-black uppercase tracking-[0.2em] text-[var(--green)]">
                  {spec.label}
                </p>
              </div>
            ))}
          </aside>

          <div className="relative min-h-[560px]">
            <p className="pointer-events-none absolute left-0 top-4 display-font text-[11rem] leading-none text-white/[0.035] md:text-[16rem]">
              PRIVATE
            </p>

            <div className="perspective-stage absolute left-1/2 top-1/2 h-[480px] w-[430px] -translate-x-1/2 -translate-y-1/2 md:h-[620px] md:w-[560px]">
              <div className="absolute left-1/2 top-[58%] h-20 w-[460px] -translate-x-1/2 rounded-full bg-black/80 blur-3xl" />

              <div className="book-float preserve-3d absolute left-[18%] top-[14%] h-[420px] w-[310px] border border-white/12 bg-gradient-to-br from-[#161b16] via-[#242a24] to-black p-7 shadow-2xl shadow-black md:left-[24%] md:h-[500px] md:w-[360px]">
                <div className="absolute inset-y-8 left-8 w-2 bg-[var(--green)]" />
                <div className="absolute -right-12 top-20 h-24 w-24 rounded-full border-[14px] border-white/15 border-t-[var(--green)] spin-disc" />

                <p className="ml-8 text-xs font-black uppercase tracking-[0.32em] text-[var(--green)]">
                  {site.name}
                </p>
                <h1 className="display-font ml-8 mt-9 text-7xl leading-[0.82] tracking-tight md:text-8xl">
                  Private
                  <br />
                  Project
                  <br />
                  Orders
                </h1>
                <p className="ml-8 mt-6 max-w-[14rem] text-sm leading-6 text-white/58">
                  Students order inside the site and continue only through a private chat room.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-20">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="h-px flex-1 bg-white/14" />
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">
                Website-only order system
              </p>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
              No WhatsApp. No phone number. No SMS.
            </p>
            <h2 className="display-font mt-4 text-7xl leading-[0.84] md:text-8xl">
              Start and chat
              <br />
              inside the website.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/56 md:text-base">
              {site.positioning} Students fill a project brief and receive a private
              order link where all communication happens.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <OrderTransitionLink
                href="/start"
                className="border border-[var(--green)] bg-[var(--green)] px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Start Order
              </OrderTransitionLink>
              <Link
                href="/details"
                className="border border-white/14 px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-white hover:text-white"
              >
                View Details
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/56"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CinematicBook />

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="glass-black p-8">
            <p className="display-font text-4xl">01</p>
            <h3 className="mt-5 text-2xl font-bold">Student submits brief</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              They enter subject, topic, class, pages, deadline and instructions.
            </p>
          </div>
          <div className="glass-black p-8">
            <p className="display-font text-4xl text-[var(--green)]">02</p>
            <h3 className="mt-5 text-2xl font-bold">Order is stored</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              The website saves the brief in Supabase and creates a private order code.
            </p>
          </div>
          <div className="glass-black p-8">
            <p className="display-font text-4xl">03</p>
            <h3 className="mt-5 text-2xl font-bold">Owner replies in chat</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              The student and owner communicate only inside the website chat room.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-7xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
                Start section
              </p>
              <h2 className="display-font mt-3 text-6xl leading-none">
                Ready to order your assignment?
              </h2>
            </div>
            <OrderTransitionLink
              href="/start"
              className="border border-[var(--green)] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-[var(--green)] transition hover:bg-[var(--green)] hover:text-black"
            >
              Start Order
            </OrderTransitionLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
