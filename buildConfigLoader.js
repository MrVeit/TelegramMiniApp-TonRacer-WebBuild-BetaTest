window.BuildInfoLoaded = new Promise((resolve, reject) =>
{
    fetch('https://hyyyyper.app/build-info.json')
        .then((response) => {
          if (!response.ok)
          {
            throw new Error(`Failed to load build config, ${response.statusText}`);
          }
      
          return response.json();
        })
        .then((data) =>
        {
          window.BuildInfo = {
            version: data.version,
            buildNumber: data.buildNumber
          };
      
          console.log(`Build Info loaded: ${JSON.stringify(window.BuildInfo)}`);
      
          resolve();
        })
        .catch((error) =>
        {
          console.error(`Failed to load build config`, error);
    
          reject(error);
        });
   });
