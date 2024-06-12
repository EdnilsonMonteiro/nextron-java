// main/fingerprint.js
const FingerprintScanner = require("node-fingerprint-scanner");

class FingerprintService {
  constructor() {
    this.scanner = new FingerprintScanner();
  }

  async initialize() {
    try {
      await this.scanner.init();
      console.log("Fingerprint scanner initialized");
    } catch (error) {
      console.error("Error initializing fingerprint scanner:", error);
    }
  }

  async captureFingerprint() {
    return new Promise((resolve, reject) => {
      this.scanner.capture((err, fingerprintData) => {
        if (err) {
          reject(err);
        } else {
          resolve(fingerprintData);
        }
      });
    });
  }
}

module.exports = FingerprintService;
