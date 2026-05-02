const CACHE_NAME = "lailala-v1";

self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Lailala";
  const options = {
    body: data.body || "",
    icon: data.icon || "/favicon.svg",
    badge: "/favicon.svg",
    data: {
      url: data.url || "/",
    },
    requireInteraction: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data ? event.notification.data.url : "/";
  event.waitUntil(
    self.clients.openWindow(url)
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
