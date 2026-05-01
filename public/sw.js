const CACHE_NAME = "lailala-v1";

self.addEventListener("push", (event: any) => {
  const data = event.data?.json() || {};
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

self.addEventListener("notificationclick", (event: any) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    (self as any).clients.openWindow(url)
  );
});

self.addEventListener("activate", (event: any) => {
  event.waitUntil(self.clients.claim());
});
