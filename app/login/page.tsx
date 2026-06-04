"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navigation } from "../../components/Navigation";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginLoading() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative grid min-h-screen place-items-center px-6 pt-28">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <div className="glass-black relative z-10 p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
            Loading
          </p>
          <h1 className="luxury-font mt-4 text-4xl font-black">
            Please wait...
          </h1>
        </div>
      </section>
    </main>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPage = searchParams.get("next") || "/account";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    try {
      if (mode === "signup") {
        const { error } = await supabaseBrowser.auth.signUp({
          email,
          password
        });

        if (error) throw error;
      } else {
        const { error } = await supabaseBrowser.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
      }

      router.push(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navigation />

      <section className="relative grid min-h-screen place-items-center px-6 pt-28">
        <div className="absolute inset-0 carbon-grid opacity-70" />
        <div className="noise-layer" />

        <form onSubmit={submit} className="glass-black relative z-10 w-full max-w-xl p-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--green)]">
            Student account
          </p>

          <h1 className="luxury-font mt-4 text-5xl font-black leading-none">
            {mode === "login" ? "Login." : "Create account."}
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/55">
            Login to submit your order, view previous orders, and continue
            chatting with MAX & Co.
          </p>

          <div className="mt-7 space-y-4">
            <input
              required
              name="email"
              type="email"
              className="input-dark"
              placeholder="Email address"
            />

            <input
              required
              name="password"
              type="password"
              minLength={6}
              className="input-dark"
              placeholder="Password"
            />
          </div>

          {error ? (
            <div className="mt-5 border border-red-400/35 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <button
            disabled={loading}
            className="mt-6 w-full border border-[var(--green)] bg-[var(--green)] px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-white disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-5 w-full text-sm text-white/55 hover:text-white"
          >
            {mode === "login"
              ? "New student? Create account"
              : "Already have account? Login"}
          </button>
        </form>
      </section>
    </main>
  );
}