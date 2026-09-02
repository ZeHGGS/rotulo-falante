/* Service worker do Rótulo Falante.
   Casca do app em cache: abre sem internet.
   API de alimentos: rede primeiro, cache como reserva. */
const CACHE = "rotulo-falante-v1";
const CASCA = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png",
  "https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // addAll falha inteiro se um item falhar; guardamos um a um
      Promise.all(CASCA.map((u) => c.add(u).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // Produto: tenta rede, guarda a resposta boa, cai no cache se estiver offline
  if (req.url.includes("openfoodfacts.org")) {
    e.respondWith(
      fetch(req)
        .then((r) => {
          if (r.ok) { const copia = r.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
          return r;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Casca do app: cache primeiro
  e.respondWith(caches.match(req).then((c) => c || fetch(req)));
});
