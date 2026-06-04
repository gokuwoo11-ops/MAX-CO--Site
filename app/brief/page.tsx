"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "../../components/Navigation";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

const quickTypes = [
  "PDF formatting",
  "Assignment formatting",
  "Project record",
  "Front page design",
  "Diagram / chart work",
  "Full project layout"
];

export default function BriefPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [projectType, setProjectType] = useState("PDF formatting");
  const [customType, setCustomType] = useState("");
  const [error, setError] = useState("");
  const [checkingLogin, setCheckingLogin] = useState(true);

useEffect(() => {
  async function checkLogin() {
    const { data: sessionData } = await supabaseBrowser.auth.getSession();

    if (!sessionData.session) {
      router.push("/login?next=/brief");
      return;
    }

    setCheckingLogin(false);
  }

  checkLogin();
}, [router]);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { data: sessionData } = await supabaseBrowser.auth.getSession();

    if (!sessionData.session) {
      router.push("/login");
      return;
    }

    const form = new FormData(event.currentTarget);
    const finalProjectType = customType.trim() || projectType;

    const payload = {
      studentName: String(form.get("studentName") || "").trim(),
      classGrade: String(form.get("classGrade") || "").trim(),
      projectType: finalProjectType,
      subject: String(form.get("subject") || "").trim(),
      topic: String(form.get("topic") || "").trim(),
      pages: String(form.get("pages") || "").trim(),
      deadline: String(form.get("deadline") || "").trim(),
      instructions: String(form.get("instructions") || "").trim(),
      referenceNotes: String(form.get("referenceNotes") || "").trim()
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Could not create order.");

      router.push(`/order/${data.orderCode}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  if (checkingLogin) {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />
      <section className="relative grid min-h-screen place-items-center px-6 pt-28">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="glass-black relative z-10 p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
            Checking login
          </p>
          <h1 className="luxury-font mt-4 text-4xl font-black">
            Please wait...
          </h1>
        </div>
      </section>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />
      <section className="relative px-6 pb-20 pt-36">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />
        <p className="pointer-events-none absolute right-[-1rem] top-28 luxury-font text-[5.8rem] font-black leading-none text-white/[0.045] md:text-[12rem]">Brief</p>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">Secure project brief</p>
            <h1 className="luxury-font mt-5 text-5xl font-black leading-[0.92] md:text-7xl">Fill the order details.</h1>
            <p className="editorial-font mt-7 text-2xl leading-8 text-white/64">
              After submitting, the site creates a private order room. Your order will also be saved in your student account.
            </p>
          </div>

          <form onSubmit={submitOrder} className="glass-black relative overflow-hidden p-6 md:p-8">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--green-soft)] blur-2xl" />
            <div className="relative z-10">
              <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">Order console</p>
                  <h2 className="luxury-font mt-2 text-4xl font-black leading-none">Project brief</h2>
                </div>
                <div className="hidden border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/38 sm:block">Private</div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Name / Nickname</span>
                  <input required name="studentName" className="input-dark" placeholder="Enter your name" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Class</span>
                  <input required name="classGrade" className="input-dark" placeholder="Enter your class or grade" />
                </label>

                <div className="md:col-span-2">
                  <span className="mb-3 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Project Type</span>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {quickTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => { setProjectType(type); setCustomType(""); }}
                        className={`border p-4 text-left text-xs font-black uppercase tracking-[0.13em] transition ${
                          projectType === type && !customType
                            ? "border-[var(--green)] bg-[var(--green-soft)] text-[var(--green)]"
                            : "border-white/10 bg-white/[0.035] text-white/55 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <input value={customType} onChange={(event) => setCustomType(event.target.value)} className="input-dark mt-3" placeholder="Or type custom work type" />
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Subject</span>
                  <input required name="subject" className="input-dark" placeholder="Enter subject name" />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Pages</span>
                  <input required name="pages" className="input-dark" placeholder="Enter required page count" />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Topic</span>
                  <input required name="topic" className="input-dark" placeholder="Enter your assignment or project topic" />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Deadline</span>
                  <input required name="deadline" className="input-dark" placeholder="Enter your submission deadline" />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Teacher Instructions</span>
                  <textarea name="instructions" rows={4} className="input-dark resize-none" placeholder="Mention headings, format, page order, or special instructions." />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/45">Reference Notes</span>
                  <textarea name="referenceNotes" rows={4} className="input-dark resize-none" placeholder="Paste rough notes or describe what content you already have. File upload can be added next." />
                </label>
              </div>

              {error ? <div className="mt-5 border border-red-400/35 bg-red-500/10 p-4 text-sm text-red-200">{error}</div> : null}

              <button type="submit" disabled={loading} className="mt-7 w-full border border-[var(--green)] bg-[var(--green)] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? "Creating private room..." : "Submit and open private room"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
