"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Order, OrderMessage } from "../lib/types";

type OrderPayload = {
  order: Order;
  messages: OrderMessage[];
};

export function OwnerInboxClient() {
  const [pin, setPin] = useState("");
  const [savedPin, setSavedPin] = useState("");
  const [orders, setBriefs] = useState<Order[]>([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [selected, setSelected] = useState<OrderPayload | null>(null);
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loadingBriefs, setLoadingBriefs] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem("owner_pin") || "";
    if (existing) {
      setSavedPin(existing);
      setPin(existing);
      loadBriefs(existing);
    }
  }, []);

  async function loadBriefs(currentPin = savedPin) {
    if (!currentPin) return;

    setLoadingBriefs(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        headers: {
          "x-owner-pin": currentPin
        },
        cache: "no-store"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load orders.");
      }

      setBriefs(data.orders || []);

      if (!selectedCode && data.orders?.[0]?.code) {
        setSelectedCode(data.orders[0].code);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders.");
    } finally {
      setLoadingBriefs(false);
    }
  }

  async function loadSelected(code: string, currentPin = savedPin) {
    if (!code) return;

    try {
      const response = await fetch(`/api/orders/${code}`, { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not load order.");
      }

      setSelected(data);
      setSelectedCode(code);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load selected order.");
    }
  }

  useEffect(() => {
    if (!savedPin) return;

    if (selectedCode) {
      loadSelected(selectedCode);
    }

    const timer = window.setInterval(() => {
      loadBriefs(savedPin);
      if (selectedCode) loadSelected(selectedCode);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [savedPin, selectedCode]);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("owner_pin", pin);
    setSavedPin(pin);
    loadBriefs(pin);
  }

  async function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!reply.trim() || !selectedCode || !savedPin) return;

    try {
      const response = await fetch(`/api/orders/${selectedCode}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-owner-pin": savedPin
        },
        body: JSON.stringify({
          sender: "owner",
          message: reply
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send reply.");
      }

      setReply("");
      await loadSelected(selectedCode);
      await loadBriefs(savedPin);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send reply.");
    }
  }

  if (!savedPin) {
    return (
      <form onSubmit={unlock} className="mx-auto max-w-xl glass-black p-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
          Studio access
        </p>
        <h1 className="display-font mt-4 text-6xl leading-none">Enter PIN.</h1>
        <p className="mt-4 text-sm leading-7 text-white/50">
          Use your private PIN from the .env.local file.
        </p>

        <input
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          className="input-dark mt-6"
          placeholder="Studio PIN"
          type="password"
        />

        {error ? (
          <div className="mt-4 border border-red-400/35 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <button className="mt-5 w-full border border-[var(--green)] bg-[var(--green)] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white">
          Open Studio Desk
        </button>
      </form>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.76fr_1.24fr]">
      <aside className="glass-black min-h-[680px] p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
              Studio inbox
            </p>
            <h1 className="display-font mt-2 text-5xl leading-none">Briefs</h1>
          </div>

          <button
            onClick={() => {
              window.localStorage.removeItem("owner_pin");
              setSavedPin("");
              setPin("");
            }}
            className="border border-white/12 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/50 hover:text-white"
          >
            Lock
          </button>
        </div>

        <button
          onClick={() => loadBriefs(savedPin)}
          className="mb-4 w-full border border-white/12 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/60 hover:border-[var(--green)] hover:text-[var(--green)]"
        >
          {loadingBriefs ? "Refreshing..." : "Refresh Briefs"}
        </button>

        <div className="space-y-3">
          {orders.map((order) => (
            <button
              key={order.id}
              onClick={() => loadSelected(order.code)}
              className={`w-full border p-4 text-left transition ${
                selectedCode === order.code
                  ? "border-[var(--green)] bg-[var(--green-soft)]"
                  : "border-white/10 bg-white/[0.035] hover:border-white/25"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--green)]">
                {order.code}
              </p>
              <p className="mt-2 font-bold">{order.subject}</p>
              <p className="mt-1 text-sm text-white/45">{order.topic}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-white/35">
                {order.status}
              </p>
            </button>
          ))}

          {!orders.length ? (
            <div className="border border-white/10 bg-white/[0.035] p-4 text-sm text-white/45">
              No orders yet.
            </div>
          ) : null}
        </div>
      </aside>

      <section className="glass-black flex min-h-[680px] flex-col p-5">
        {!selected ? (
          <div className="grid flex-1 place-items-center text-white/45">
            Select an order to open chat.
          </div>
        ) : (
          <>
            <div className="border-b border-white/10 pb-4">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
                {selected.order.code}
              </p>
              <h2 className="mt-2 text-2xl font-bold">
                {selected.order.subject} — {selected.order.topic}
              </h2>
              <p className="mt-2 text-sm text-white/45">
                {selected.order.student_name} • {selected.order.class_grade} • {selected.order.deadline}
              </p>
            </div>

            <div className="grid gap-3 border-b border-white/10 py-4 text-sm md:grid-cols-2">
              <Mini label="Type" value={selected.order.project_type} />
              <Mini label="Pages" value={selected.order.pages} />
              <Mini label="Instructions" value={selected.order.instructions || "-"} />
              <Mini label="Notes" value={selected.order.reference_notes || "-"} />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto py-5">
              {selected.messages.map((item) => (
                <div
                  key={item.id}
                  className={`max-w-[82%] border p-4 text-sm leading-6 ${
                    item.sender === "owner"
                      ? "ml-auto border-[var(--green)]/30 bg-[var(--green-soft)]"
                      : item.sender === "customer"
                        ? "border-white/12 bg-white/[0.055]"
                        : "mx-auto border-white/10 bg-black/30 text-center text-white/46"
                  }`}
                >
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
                    {item.sender === "owner"
                      ? "Owner"
                      : item.sender === "customer"
                        ? "Customer"
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

            <form onSubmit={sendReply} className="flex gap-3 border-t border-white/10 pt-4">
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                className="input-dark flex-1"
                placeholder="Reply from studio..."
              />
              <button className="border border-[var(--green)] bg-[var(--green)] px-6 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white">
                Send
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-white/[0.035] p-3">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
        {label}
      </p>
      <p className="mt-2 text-white/65">{value}</p>
    </div>
  );
}
