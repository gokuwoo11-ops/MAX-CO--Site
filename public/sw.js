self.addEventListener("push", function (event) {
  let data = {
    title: "New MAX & Co order",
    body: "A new project brief was submitted.",
    url: "/studio-desk-7q4"
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "New MAX & Co order", {
      body: data.body || "A new project brief was submitted.",
      tag: data.tag || "max-and-co-order",
      renotify: true,
      data: { url: data.url || "/studio-desk-7q4" }
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const targetUrl = new URL(event.notification.data?.url || "/studio-desk-7q4", self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (clientList) {
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
