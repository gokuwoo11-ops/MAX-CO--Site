"use client";

import { useEffect, useState } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let index = 0; index < rawData.length; index++) {
    outputArray[index] = rawData.charCodeAt(index);
  }

  return outputArray;
}

export function NotificationSetup() {
  const [status, setStatus] = useState("Checking notification support...");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;

    setReady(supported);

    if (!supported) {
      setStatus("Browser push notifications are not supported here.");
      return;
    }

    setStatus("Notifications are available. Enable them after unlocking studio.");
  }, []);

  async function enableNotifications() {
    try {
      const ownerPin = window.localStorage.getItem("owner_pin") || "";

      if (!ownerPin) {
        setStatus("Open the studio desk with your PIN first, then enable notifications.");
        return;
      }

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!publicKey) {
        setStatus("Missing NEXT_PUBLIC_VAPID_PUBLIC_KEY.");
        return;
      }

      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        setStatus("Notification permission was not allowed.");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      const existingSubscription = await registration.pushManager.getSubscription();
      const subscription =
        existingSubscription ||
        (await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        }));

      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-owner-pin": ownerPin
        },
        body: JSON.stringify(subscription)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not enable notifications.");
      }

      setStatus("Browser notifications enabled for this device.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not enable notifications.");
    }
  }

  return (
    <div className="mb-6 border border-[var(--green)]/30 bg-[var(--green-soft)] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--green)]">
            Studio notifications
          </p>
          <p className="mt-2 text-sm leading-6 text-white/62">{status}</p>
        </div>

        <button
          onClick={enableNotifications}
          disabled={!ready}
          className="border border-[var(--green)] bg-[var(--green)] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enable notifications
        </button>
      </div>
    </div>
  );
}
