# MMM-SpeedTest 

Network Connection Status (ping, download, upload) Module for MagicMirror 

## Example

# ![](others/MMM-NetworkConnection-screenshot-01.png)	![](others/MMM-NetworkConnection-screenshot-02.png)

## Dependencies

* An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* [speedtest-net](https://www.npmjs.com/package/speedtest-net) module of nodejs

## Installation

1. Clone this repo into `~/MagicMirror/modules` directory. git clone https://github.com/MaxTheTechy/MMM-SpeedTest 
2. Go to `~/MagicMirror/modules/MMM-SpeedTest` directory and do `npm install`
3. Configure your `~/MagicMirror/config/config.js`:

    ```
     {
          module: "MMM-SpeedTest",
          position: "bottom_left", // Choose the desired position
          config: {
            updateInterval: 2 * 60 * 1000, // 2 minutes
            debug: true // Enable debugging
                  }
      },

    ```
4. restart PM
## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `updateInterval` | `600000 ms` (10 minutes) | how often should the devices states refreshed |
| `maxTime` | `5000` milliseconds | how long to do speedtest |
| `initialLoadDelay` | `2500` milliseconds | how long to delay to load the module |
| `decimal` | `1` | how many decimals for the round |
| `animationSpeed` | `2500` milliseconds | speed of the update animation |


## Troubleshooting

Welcome to the MMM-SpeedTest wiki!


if for some reasong your MagicMirror 2 failes to laod and on the logs you have something like below 
    \`\`\`javascript
console.log("Hello, world!");
\`\`\`


##
/home/max/.pm2/logs/mm-error.log last 15 lines:
0|mm       |     at Object.<anonymous> (/home/max/MagicMirror/modules/MMM-SpeedTest/node_helper.js:3:19)
0|mm       |     at Module._compile (node:internal/modules/cjs/loader:1256:14)
0|mm       |     at Module._extensions..js (node:internal/modules/cjs/loader:1311:10)
0|mm       |     at Module.load (node:internal/modules/cjs/loader:1098:32)
0|mm       |     at Module._load (node:internal/modules/cjs/loader:945:12)
0|mm       |     at c._load (node:electron/js2c/node_init:2:13672)
0|mm       |     at Module.require (node:internal/modules/cjs/loader:1122:19)
0|mm       |     at require (node:internal/modules/helpers:130:18)
0|mm       |     at loadModule (/home/max/MagicMirror/js/app.js:183:19)
0|mm       | (Use `electron --trace-warnings ...` to show where the warning was created)
0|mm       | [2024-12-13 12:27:32.445] [ERROR] (node:24745) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
0|mm       | [24745:1213/122734.019293:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
0|mm       | [24745:1213/122734.022185:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
0|mm       | [24745:1213/122734.022577:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")
0|mm       | [24745:1213/122734.022801:ERROR:bus.cc(407)] Failed to connect to the bus: Could not parse server address: Unknown address type (examples of valid types are "tcp" and on UNIX "unix")

    ```


The error indicates that the lzma-native dependency required by the speedtest-net package is missing or not properly built for your environment. This is a common issue, especially on ARM-based devices like the Raspberry Pi when using electron.


Steps to Resolve
1. Rebuild Native Modules
You need to rebuild lzma-native for electron. Run the following commands in your MagicMirror directory:

    ```
cd ~/MagicMirror
npm install
npm rebuild --runtime=electron --target=$(node -p "require('electron/package.json').version") --disturl=https://electronjs.org/headers --abi=$(node -p "process.versions.modules")
    ```


2. Manually Install lzma-native
If rebuilding doesn't work, manually install lzma-native:

    ```
cd ~/MagicMirror
npm install lzma-native
    ```


## 3. Verify Electron Version
Check the version of electron used by MagicMirror to ensure compatibility with lzma-native. Run:

    ```
cd ~/MagicMirror
npx electron --version
    ```


If the version is outdated, you may need to update electron. For example:
    ```

npm install electron@latest
    ```

After updating, rebuild native modules again.


## 5. Check Logs
After performing the above steps, restart MagicMirror and monitor the logs for updates:
    ```

pm2 restart mm
tail -f ~/.pm2/logs/mm-error.log
    ```


