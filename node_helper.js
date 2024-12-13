// File: node_helper.js
const NodeHelper = require("node_helper");
const speedTest = require("speedtest-net");

module.exports = NodeHelper.create({
  start() {
    this.config = null;
    console.log("[MMM-SpeedTest] Node helper started.");
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "START_SPEED_TEST") {
      this.config = payload;
      this.performSpeedTest();
    }
  },

  async performSpeedTest() {
    try {
      if (this.config.debug) {
        console.log("[MMM-SpeedTest] Performing speed test...");
      }

      const result = await speedTest({ acceptLicense: true, acceptGdpr: true  });
      const speedData = {
        download: (result.download.bandwidth / 125000).toFixed(2),
        upload: (result.upload.bandwidth / 125000).toFixed(2),
        ping: result.ping.latency.toFixed(2),
      };

      if (this.config.debug) {
        console.log("[MMM-SpeedTest] Speed test result:", speedData);
      }

      this.sendSocketNotification("SPEED_TEST_RESULT", speedData);
    } catch (error) {
      console.error("[MMM-SpeedTest] Error performing speed test:", error);
      this.sendSocketNotification("SPEED_TEST_RESULT", null);
    }
  },
});




