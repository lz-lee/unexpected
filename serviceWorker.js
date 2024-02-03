let MAXVERSION = 'maxCache';
let urls = []; // 缓存的资源 url 集合

async function cleanCaches() {
  let cache = await caches.open(MAXVERSION);
  let requests = await cache.keys();
  await requests.forEach((res) => cache.delete(res));
}

async function cacheResources() {
  let cache = await caches.open(MAXVERSION);
  let cacheNames = await cache.keys();
  let cachedURLs = cacheNames.map((request) => request.url);
  let updateURLs = urls.filter((url) => !cachedURLs.includes(url));

  await cache.addAll(updateURLs);
}
async function getCache(event) {
  let cache = await caches.open(MAXVERSION);
  return cache.match(event.request.url);
}

const putInCache = async (request, response) => {
  const cache = await caches.open(MAXVERSION);
  await cache.put(request, response);
};
const cacheFirst = async (event) => {
  // const responseFromCache = await caches.match(eventrequest);
  const responseFromCache = await getCache(event);
  // console.log('cacheFirst >> ', responseFromCache)
  if (responseFromCache) {
    return responseFromCache;
  }
  try {
    const responseFromNetwork = await fetch(event.request.clone());
    // console.log('net worker >> ', responseFromNetwork)
    putInCache(event.request.clone(), responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    console.log('sw network error: ' + error);
  }
};

self.addEventListener('fetch', (event) => {
  if (/\.(css|js)$/.test(event.request.url)) {
    event.respondWith(cacheFirst(event));
  }
});

self.addEventListener('install', (event) => {
  // 安装回调的逻辑处理
  self.skipWaiting();
  event.waitUntil(
    cleanCaches().then(() => {
      cacheResources().catch((error) => {
        console.log('sw cache error: ' + error);
        self.clients.claim();
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  // 激活回调的逻辑处理
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim(),
      // 删除旧缓存
      cleanCaches(),
    ])
  );
});

// index.html 使用

{
  /* <script>
if ("serviceWorker" in navigator ) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "./" })
    .then(function (registration) {})
    .catch(function (err) {});
}
</script> */
}
