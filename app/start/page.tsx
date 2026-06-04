import Link from "next/link";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";

const sideSpecs = [
  { top: "PRIVATE", bottom: "CONTACT" },
  { top: "FORM", bottom: "BRIEF" },
  { top: "ORDER", bottom: "CODE" },
  { top: "CHAT", bottom: "ROOM" }
];

const orderTypes = [
  "PDF formatting",
  "Assignment layout",
  "Project record",
  "Diagram / chart work"
];

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative min-h-screen overflow-hidden px-6 pb-16 pt-28">
        <div className="absolute inset-0 carbon-grid opacity-75" />
        <div className="noise-layer" />
        <div className="absolute left-[-6rem] top-28 h-80 w-80 rounded-full bg-[var(--green-soft)] blur-3xl" />
        <div className="absolute bottom-24 right-[-7rem] h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 lg:grid-cols-[0.18fr_1.06fr_0.76fr] lg:items-center">
          <aside className="hidden h-full flex-col justify-center gap-10 lg:flex">
            {sideSpecs.map((item) => (
              <div key={item.top} className="flex items-center gap-4">
                <p className="display-font vertical-word text-3xl leading-none text-white">
                  {item.top}
                </p>
                <p className="vertical-word text-[10px] font-black uppercase tracking-[0.2em] text-[var(--green)]">
                  {item.bottom}
                </p>
              </div>
            ))}
          </aside>

          <div className="relative min-h-[560px]">
            <p className="pointer-events-none absolute left-0 top-4 luxury-font text-[5.8rem] font-black leading-none text-white/[0.045] md:text-[9rem]">
              Order
            </p>

            <div className="perspective-stage absolute left-1/2 top-1/2 h-[510px] w-[430px] -translate-x-1/2 -translate-y-1/2 md:h-[640px] md:w-[570px]">
              <div className="absolute left-1/2 top-[58%] h-20 w-[460px] -translate-x-1/2 rounded-full bg-black/80 blur-3xl" />

              <div className="book-float preserve-3d absolute left-[16%] top-[12%] h-[440px] w-[320px] border border-white/12 bg-gradient-to-br from-[#151a15] via-[#202920] to-black p-7 shadow-2xl shadow-black md:left-[23%] md:h-[520px] md:w-[370px]">
                <div className="absolute inset-y-8 left-8 w-2 bg-[var(--green)]" />
                <div className="absolute -right-12 top-24 h-24 w-24 rounded-full border-[14px] border-white/15 border-t-[var(--green)] spin-disc" />
                <div className="absolute bottom-10 right-8 h-24 w-24 border border-white/10 bg-white/[0.025]" />

                <p className="ml-8 text-xs font-black uppercase tracking-[0.32em] text-[var(--green)]">
                  Assignment Order
                </p>
                <h1 className="luxury-font ml-8 mt-9 text-5xl font-black leading-[0.94] tracking-tight md:text-6xl">
                  Project
                  <br />
                  Brief
                  <br />
                  Console
                </h1>
                <p className="ml-8 mt-6 max-w-[14rem] text-sm leading-6 text-white/58">
                  Submit the requirement. Receive a private order room. Chat only inside the website.
                </p>

                <div className="absolute bottom-8 left-16 right-8 border border-[var(--green)]/35 bg-[var(--green-soft)] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--green)]">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">Ready to collect brief</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="h-px flex-1 bg-white/14" />
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">
                Website-only order
              </p>
            </div>

            <div className="mb-7 flex items-center gap-3 border border-[var(--green)]/50 bg-black/45 px-5 py-4 green-glow">
              <div className="h-3 w-3 rounded-full bg-[var(--green)]" />
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--green)]">
                Private ordering system active
              </p>
            </div>

            <h2 className="luxury-font text-5xl font-black leading-[0.94] md:text-7xl">
              Start your
              <br />
              assignment order.
            </h2>

            <p className="editorial-font mt-6 max-w-xl text-2xl leading-8 text-white/64">
              No personal contact. No phone number. Fill your project brief and
              continue with the studio only through your private website chat room.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {orderTypes.map((type) => (
                <div
                  key={type}
                  className="border border-white/10 bg-white/[0.035] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white/56"
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/brief"
                className="border border-[var(--green)] bg-[var(--green)] px-8 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white"
              >
                Start Assignment Order
              </Link>
              <Link
                href="/details"
                className="border border-white/14 px-8 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-white hover:text-white"
              >
                Read Details
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="glass-black p-7">
            <p className="display-font text-5xl">01</p>
            <h3 className="mt-4 text-2xl font-bold">Fill the brief</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              Add subject, topic, class, pages, deadline and teacher instructions.
            </p>
          </div>
          <div className="glass-black p-7">
            <p className="display-font text-5xl text-[var(--green)]">02</p>
            <h3 className="mt-4 text-2xl font-bold">Get private code</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              The website creates a private order code and opens your order room.
            </p>
          </div>
          <div className="glass-black p-7">
            <p className="display-font text-5xl">03</p>
            <h3 className="mt-4 text-2xl font-bold">Chat in website</h3>
            <p className="mt-3 text-sm leading-7 text-white/52">
              All updates and replies happen in your private order chat.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
