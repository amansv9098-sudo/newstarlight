const C='nsl-v2',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
/* Pehle internet se nayi file lo (hamesha latest), net na ho to saved copy dikhao */
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!='GET'||new URL(r.url).origin!=self.location.origin)return;
  e.respondWith(fetch(r).then(x=>{if(x&&x.ok){const y=x.clone();caches.open(C).then(c=>c.put(r,y))}return x}).catch(()=>caches.open(C).then(c=>c.match(r,{ignoreSearch:true}).then(m=>m||c.match('./index.html')))));
});
