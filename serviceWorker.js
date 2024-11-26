let buildDirectory = "Build"
let templateDataDir = "TemplateData";

let cacheName = "HyyyyperCache";
let buildVersion = "default";

self.addEventListener("message", (event) =>
{
  if (eventData && event.data.type == "INIT_BUILD_INFO")
  {
    const buildInfo = event.data.payload;

    cacheName = `${cacheName}_${buildInfo.version}_${buildInfo.buildInfo}`;

    console.log(cacheName);

    buildVersion = buildInfo.version;

    console.log(`Service Worker initialized with cache name: ${cacheName}`);
  }
});

self.addEventListener("install", function(event)
{
  console.log('service worker: install ' + version);

  event.waitUntil(
    caches.open(cacheName).then((cache) =>
    {
      return cache.addAll([
          "./",
          `index.html`,
          `index.js`,
          `buildConfigLoader.js`,
          `${buildDirectory}/TelegramMiniApp-TonRacer-WebBuild-BetaTest.loader.js`,
          `${buildDirectory}/TelegramMiniApp-TonRacer-WebBuild-BetaTest.data.unityweb`,
          `${buildDirectory}/TelegramMiniApp-TonRacer-WebBuild-BetaTest.framework.js.unityweb`,
          `${buildDirectory}/TelegramMiniApp-TonRacer-WebBuild-BetaTest.wasm.unityweb`,
          `${templateDataDir}/Background.jpg`,
          `${templateDataDir}/DesktopBackground.jpg`,
          `${templateDataDir}/favicon.ico`,
          `${templateDataDir}/ProgressBar-Background.png`,
          `${templateDataDir}/ProgressBar-Fill.png`,
          `${templateDataDir}/Fonts/Mont Heavy.otf`
        ]);
    })
    .catch((error) =>
    {
      console.error('Failed to cache files:', error);
    })
  );
});
  
self.addEventListener('activate', function(event) 
{
  console.log('service worker: Activate ' + cacheName);

  event.waitUntil(
      caches.keys().then(function(keyList)
      {
        return Promise.all(
          keyList.map(function(key)
          {
            if (key !== cacheName)
            {
              console.log('service worker: Removing old cache', key);

              return caches.delete(key);
            }
          })
        );
      })
    );

    return self.clients.claim();
});
  
  self.addEventListener('message', function(event)
  {
    console.log('service worker: Message ' + version);

    if (event.data.title && event.data.title === 'VersionTest')
    {
      if (event.data.version !== version)
      {
        messageClient(event.source, { title: 'ReplaceWorker' });
      }
      else
      {
        messageClient(event.source, { title: 'SameVersion' });
      }
    }
  });
  
  let messageClient = async function(clientSource, message) {
    clientSource.postMessage(message);
  };
