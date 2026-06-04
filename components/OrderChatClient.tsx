"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Order, OrderMessage } from "../lib/types";

type Props = {
  code: string;
};

export function OrderChatClient({ code }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<OrderMessage[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function loadOrder() {
    try {
      const response = await fetch(`/api/orders/${code}`, { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load order.");
      }

      setOrder(data.order);
      setMessages(data.messages || []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
    const timer = window.setInterval(loadOrder, 3000);
    return () => window.clearInterval(timer);
  }, [code]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) return;

    setSending(true);

    try {
      const response = await fetch(`/api/orders/${code}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: "customer",
          message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send message.");
      }

      setMessage("");
      await loadOrder();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send message.");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="glass-black p-8 text-white/55">
        Loading private order room...
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="border border-red-400/35 bg-red-500/10 p-6 text-red-200">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
      <aside className="glass-black p-6">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
          Order Code
        </p>
        <h1 className="display-font mt-3 text-6xl leading-none">{order?.code}</h1>

        <div className="mt-6 space-y-4 text-sm">
          <Info label="Status" value={order?.status || "-"} />
          <Info label="Name" value={order?.student_name || "-"} />
          <Info label="Class" value={order?.class_grade || "-"} />
          <Info label="Type" value={order?.project_type || "-"} />
          <Info label="Subject" value={order?.subject || "-"} />
          <Info label="Topic" value={order?.topic || "-"} />
          <Info label="Pages" value={order?.pages || "-"} />
          <Info label="Deadline" value={order?.deadline || "-"} />
        </div>

        <div className="mt-6 border border-white/10 bg-white/[0.035] p-4 text-xs leading-6 text-white/48">
          Save this page link. This is your private order room. All replies from
          the owner will appear here.
        </div>
      </aside>

      <section className="glass-black flex min-h-[620px] flex-col p-5">
        <div className="border-b border-white/10 pb-4">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-white/38">
            Private website chat
          </p>
          <h2 className="mt-2 text-2xl font-bold">Talk with the owner here</h2>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-5">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`max-w-[82%] border p-4 text-sm leading-6 ${
                item.sender === "customer"
                  ? "ml-auto border-[var(--green)]/30 bg-[var(--green-soft)] text-white"
                  : item.sender === "owner"
                    ? "border-white/12 bg-white/[0.055] text-white"
                    : "mx-auto border-white/10 bg-black/30 text-center text-white/46"
              }`}
            >
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                {item.sender === "customer"
                  ? "You"
                  : item.sender === "owner"
                    ? "Owner"
                    : "System"}
              </p>
              {item.body}
            </div>
          ))}
        </div>

        {error ? (
          <div className="mb-4 border border-red-400/35 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <form onSubmit={sendMessage} className="flex gap-3 border-t border-white/10 pt-4">
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="input-dark flex-1"
            placeholder="Type your message..."
          />
          <button
            disabled={sending}
            className="border border-[var(--green)] bg-[var(--green)] px-6 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:opacity-60"
          >
            {sending ? "Sending" : "Send"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
        {label}
      </p>
      <p className="mt-2 font-semibold text-white/75">{value}</p>
    </div>
  );
}
