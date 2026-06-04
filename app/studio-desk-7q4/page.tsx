import { Navigation } from "../../components/Navigation";
import { OwnerInboxClient } from "../../components/OwnerInboxClient";
import { NotificationSetup } from "../../components/NotificationSetup";

export default function StudioDeskPage() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative px-6 pb-20 pt-36">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
              Private studio desk
            </p>
            <h1 className="luxury-font mt-4 text-5xl font-black leading-[0.92] md:text-7xl">
              Studio inbox.
            </h1>
          </div>

          <NotificationSetup />
          <OwnerInboxClient />
        </div>
      </section>
    </main>
  );
}
