import webpush from "web-push";
import { getSupabaseAdmin } from "./supabaseAdmin";

type PushInput = {
  title: string;
  body: string;
  url?: string;
};

type PushSubscriptionRow = {
  endpoint: string;
  p256dh: string;
  auth: string;
};

export async function notifyOwnerPush(input: PushInput) {
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:owner@example.com";

  if (!publicKey || !privateKey) {
    console.warn("Push skipped: VAPID keys missing.");
    return;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);

  const supabase = getSupabaseAdmin();

  const { data: subscriptions, error } = await supabase
    .from("push_subscriptions")
    .select("endpoint,p256dh,auth");

  if (error) {
    console.error("Could not load push subscriptions:", error.message);
    return;
  }

  const payload = JSON.stringify({
    title: input.title,
    body: input.body,
    url: input.url || "/studio-desk-7q4",
    tag: "max-and-co-order"
  });

  await Promise.all(
    ((subscriptions || []) as PushSubscriptionRow[]).map(async (sub) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth
            }
          },
          payload
        );
      } catch (error: unknown) {
        const err = error as { message?: string; statusCode?: number };
        console.error("Push failed:", err?.message);

        if (err?.statusCode === 404 || err?.statusCode === 410) {
          await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", sub.endpoint);
        }
      }
    })
  );
}
