// File: MMM-SpeedTest.js

// const NodeHelper = require('node_helper');
// const speedTest = require('speedtest-net');

Module.register("MMM-SpeedTest", {
  defaults: {
    updateInterval: 60 * 60 * 1000, // Update every hour
    debug: false, // Enable debugging logs
  },

  getStyles() {
    return ["MMM-SpeedTest.css"];
  },

  start() {
    this.loaded = false;
    this.speedData = null;
    this.sendSocketNotification("START_SPEED_TEST", this.config);
    this.scheduleUpdate();
    if (this.config.debug) {
      console.log("[MMM-SpeedTest] Module started.");
    }
  },

  scheduleUpdate() {
    setInterval(() => {
      this.sendSocketNotification("START_SPEED_TEST", this.config);
    }, this.config.updateInterval);
  },

  getDom() {
    const wrapper = document.createElement("div");

    if (!this.loaded) {
      wrapper.innerHTML = "Loading speed test data...";
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (this.speedData) {
      wrapper.innerHTML = `
        <div class="speed-test">
          <div><strong>Download:</strong> ${this.speedData.download} Mbps</div>
          <div><strong>Upload:</strong> ${this.speedData.upload} Mbps</div>
          <div><strong>Ping:</strong> ${this.speedData.ping} ms</div>
        </div>
      `;
    } else {
      wrapper.innerHTML = "Speed test failed. Please check logs.";
      wrapper.className = "dimmed light small";
    }

    return wrapper;
  },

  socketNotificationReceived(notification, payload) {
    if (notification === "SPEED_TEST_RESULT") {
      this.loaded = true;
      this.speedData = payload;
      this.updateDom();
    }
  }
});

