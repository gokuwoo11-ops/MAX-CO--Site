import Link from "next/link";
import { Navigation } from "../../components/Navigation";
import { Footer } from "../../components/Footer";
import { OrderTransitionLink } from "../../components/OrderTransitionLink";

const includes = [
  {
    title: "Private order form",
    text: "Students submit subject, topic, class, pages, deadline, instructions and reference notes from the website."
  },
  {
    title: "Database storage",
    text: "The project brief is saved in Supabase with a private order code and status."
  },
  {
    title: "Customer chat room",
    text: "After submission, students get a private website order room to send and receive messages."
  },
  {
    title: "Owner inbox",
    text: "The owner can open a private panel, view all orders, check details and reply through chat."
  }
];

export default function DetailsPage() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative px-6 pb-20 pt-36">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
            Details
          </p>
          <h1 className="display-font mt-5 max-w-5xl text-7xl leading-[0.84] md:text-9xl">
            Private website workflow.
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/56">
            This setup keeps customer communication inside the website. No public
            phone number, no personal WhatsApp, and no SMS-based contact.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
          {includes.map((item, index) => (
            <article key={item.title} className="glass-black p-8">
              <p className="display-font text-5xl text-white/18">0{index + 1}</p>
              <h2 className="mt-5 text-2xl font-bold">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/52">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 pt-14">
        <div className="mx-auto max-w-7xl border border-[var(--green)] bg-[var(--green)] p-8 text-black md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-black/55">
                Next
              </p>
              <h2 className="display-font mt-3 text-6xl leading-none">
                Start an order.
              </h2>
            </div>
            <OrderTransitionLink
              href="/start"
              className="border border-black bg-black px-7 py-4 text-center text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
            >
              Start Page
            </OrderTransitionLink>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
