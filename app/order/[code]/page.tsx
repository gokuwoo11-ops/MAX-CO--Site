import Link from "next/link";
import { Navigation } from "../../../components/Navigation";
import { OrderChatClient } from "../../../components/OrderChatClient";

type PageProps = {
  params: Promise<{ code: string }>;
};

export default async function OrderPage({ params }: PageProps) {
  const { code } = await params;

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative px-6 pb-20 pt-36">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
                Private order room
              </p>
              <h1 className="display-font mt-4 text-7xl leading-[0.84] md:text-8xl">
                Order chat.
              </h1>
            </div>

            <Link
              href="/"
              className="border border-white/14 px-5 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-white/70 transition hover:border-white hover:text-white"
            >
              Home
            </Link>
          </div>

          <OrderChatClient code={code} />
        </div>
      </section>
    </main>
  );
}
