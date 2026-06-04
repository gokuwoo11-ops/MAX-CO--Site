"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../../components/Navigation";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

type Order = {
  id: string;
  code: string;
  subject: string;
  topic: string;
  project_type: string;
  deadline: string;
  status: string;
  created_at: string;
};

export default function AccountPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAccount() {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();

    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    setEmail(sessionData.session.user.email || "");

    const response = await fetch("/api/student/orders", {
      headers: { Authorization: `Bearer ${sessionData.session.access_token}` }
    });

    const data = await response.json();

    if (!response.ok) setError(data.error || "Could not load orders.");
    else setOrders(data.orders || []);

    setLoading(false);
  }

  async function logout() {
    await supabaseBrowser.auth.signOut();
    router.push("/login");
  }

  useEffect(() => { loadAccount(); }, []);

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />
      <section className="relative px-6 pb-20 pt-36">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">Student dashboard</p>
              <h1 className="luxury-font mt-4 text-5xl font-black leading-none md:text-7xl">My orders.</h1>
              <p className="mt-4 text-sm text-white/50">{email}</p>
            </div>
            <div className="flex gap-3">
              <Link href="/brief" className="border border-[var(--green)] bg-[var(--green)] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black hover:bg-white">New order</Link>
              <button onClick={logout} className="border border-white/12 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/55 hover:text-white">Logout</button>
            </div>
          </div>

          {loading ? (
            <div className="glass-black p-8 text-white/55">Loading orders...</div>
          ) : error ? (
            <div className="border border-red-400/35 bg-red-500/10 p-6 text-red-200">{error}</div>
          ) : orders.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {orders.map((order) => (
                <Link key={order.id} href={`/order/${order.code}`} className="glass-black block p-6 transition hover:border-[var(--green)]">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--green)]">{order.code}</p>
                  <h2 className="mt-4 text-2xl font-bold">{order.subject}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/50">{order.topic}</p>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-white/35">{order.project_type} • {order.deadline} • {order.status}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass-black p-8">
              <p className="text-white/55">No orders yet. Submit your first project brief.</p>
              <Link href="/brief" className="mt-6 inline-flex border border-[var(--green)] bg-[var(--green)] px-6 py-3 text-xs font-black uppercase tracking-[0.16em] text-black hover:bg-white">Start order</Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
