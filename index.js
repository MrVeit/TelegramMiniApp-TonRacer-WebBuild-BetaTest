document.addEventListener("DOMContentLoaded", function () {
  window.BuildInfoLoaded
      .then(() =>
      {
          console.log(`App version ${window.BuildInfo.version}.${window.BuildInfo.buildNumber}`);
      })
      .catch(() =>
      {
          console.error(`Failed to load Build info`);
      });
});

var TryRegisterServiceWorker = function () {
  if ('serviceWorker' in navigator) {
      let sWorkerFile = 'serviceWorker.js';

      let RegisterWorker = function () {

          console.log("Registering new worker");

          navigator.serviceWorker.register(sWorkerFile)
          .then((registration) =>
          {
            console.log("Service Worker registered");

            registration.active?.postMessage({
              type: "INIT_BUILD_INFO",
              payload: window.BuildInfo
            });
          })
          .catch((error) =>
          {
            console.error("Service Worker registration failed:", error);
          });
      }

      let sWorker = navigator.serviceWorker.controller;

      if (!sWorker) {
          RegisterWorker();
      }
  }
};

var TryUnregisterServiceWorker = function (loadPageCallback) {
  if ('serviceWorker' in navigator)
  {
      let sWorkerFile = 'serviceWorker.js';

      let UnregisterWorkers = function ()
      {
          console.log("Unregister old workers");
          
          navigator.serviceWorker.getRegistration(
            sWorkerFile).then(function (registration) {
              if (registration)
              {
                  registration.unregister().then(() =>
                  {
                      location.reload(true);
                  });
              }
          });
      };

      let sWorker = navigator.serviceWorker.controller;

      if (sWorker)
      {
          navigator.serviceWorker.addEventListener('message', (event) =>
          {
              if (event.data.title === 'ReplaceWorker')
              {
                  UnregisterWorkers();
              }
              else if (event.data.title === 'SameVersion')
              {
                  loadPageCallback();
              }
          });
          sWorker.postMessage({ title: 'VersionTest', version: serviceWorkerVersion });
      }
      else
      {
          loadPageCallback();
      }
  }
};

var ForceUnregisterServiceWorker = function ()
{
  if ('serviceWorker' in navigator)
  {
      let sWorkerFile = '/serviceWorker.js';

      let UnregisterWorkers = function ()
      {
          console.log("Unregister old workers");
          navigator.serviceWorker.getRegistration(
            sWorkerFile).then(function (registration)
          {
              if (registration)
              {
                  registration.unregister().then(() =>
                  {
                      location.reload(true);
                  });
              }
          });
      };

      UnregisterWorkers();
  }
};

TryRegisterServiceWorker();

var unityInstanceRef;
var unsubscribe;

var container = document.querySelector("#unity-container");
var progressBarContainer = document.querySelector(".progress-bar-container");
var progressBar = document.querySelector(".progress-bar");
var gameHeader = document.querySelector("#game-header");

var buildUrl = "Build";
var loaderUrl = buildUrl + "/TelegramMiniApp-TonRacer-WebBuild-BetaTest.loader.js";
var config = {
    dataUrl: buildUrl + "/TelegramMiniApp-TonRacer-WebBuild-BetaTest.data.unityweb",
    frameworkUrl: buildUrl + "/TelegramMiniApp-TonRacer-WebBuild-BetaTest.framework.js.unityweb",
    codeUrl: buildUrl + "/TelegramMiniApp-TonRacer-WebBuild-BetaTest.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "hyyyyper",
    productName: "hyyyyper",
    productVersion: "1.0"
};

function isMobile()
{
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

if (isMobile())
  {
    // Mobile device style: fill the whole browser client area with the game canvas:
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }

progressBarContainer.style.display = "block";
gameHeader.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;

script.onload = () =>
{
  createUnityInstance(document.querySelector("#unity-canvas"), config, (progress) =>
  {
    progressBar.style.width = (progress * 100) + "%";
  })
  .then((unityInstance) =>
  {
    unityInstanceRef = unityInstance;
    window.unityInstance = unityInstance;

    progressBarContainer.style.display = "none";
    gameHeader.style.display = "none";
  })
  .catch((message) =>
  {
    console.error(message);
  });
};

document.body.appendChild(script);

window.addEventListener('load', function () 
{
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();

  console.log("Telegram Web App has been expanded to full screen");

  var version = Telegram.WebApp.version;
  var versionFloat = parseFloat(version);

  if (versionFloat >= 7.7) 
  {
    Telegram.WebApp.disableVerticalSwipes();

    console.log('Activating vertical swipe disable');
  }

  console.log(`Telegram Web App opened with version: ${version}`);
});
