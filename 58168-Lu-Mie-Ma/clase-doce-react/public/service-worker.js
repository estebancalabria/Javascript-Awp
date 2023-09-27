
self.addEventListener("install", (evt)=>{
  console.log("Install");
  self.skipWaiting();
});

self.addEventListener("activate", (evt)=>{
  console.log("Activate");
  self.clients.claim();
})

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
