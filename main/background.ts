import path from "path";
import fs from "fs";
import {
  app,
  ipcMain,
  Notification,
  dialog,
  MessageBoxOptions,
} from "electron";
import serve from "electron-serve";
import { createMainWindow } from "./mainWindow";
import { sayHello, sum } from "./javaMethods";
import { autoUpdater } from "electron-updater";
import dotenv from "dotenv";

dotenv.config();

console.log("GH_TOKEN:", process.env.GH_TOKEN);

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const logDirectory = path.join(app.getPath("userData"), "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory, "notifications.log");

function logNotification(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
}

function showNotification(title, body) {
  const notificationMessage = `${title}: ${body}`;
  new Notification({ title: title, body: body }).show();
  logNotification(notificationMessage);
}

app.whenReady().then(async () => {
  await createMainWindow();

  ipcMain.handle("sayHello", async (_event, name: string) => {
    return new Promise((resolve) => {
      sayHello(name, (error, result) => {
        if (error) {
          resolve({ error });
        } else {
          resolve({ result });
        }
      });
    });
  });

  ipcMain.handle("sum", async (_event, a: number, b: number) => {
    return new Promise((resolve) => {
      sum(a, b, (error, result) => {
        if (error) {
          resolve({ error });
        } else {
          resolve({ result });
        }
      });
    });
  });

  autoUpdater.on("checking-for-update", () => {
    const message = "Checking for update...";
    console.log(message);
    showNotification("Checking for Update", message);
  });

  autoUpdater.on("update-available", (info) => {
    const message = "Update available.";
    console.log(message, info);
    showNotification("Update Available", message);
  });

  autoUpdater.on("update-not-available", (info) => {
    const message = "Update not available.";
    console.log(message, info);
    showNotification("Update Not Available", message);
  });

  autoUpdater.on("error", (err) => {
    const message = `Error in auto-updater: ${err}`;
    console.log(message);
    showNotification("Error", message);
  });

  autoUpdater.checkForUpdatesAndNotify();

  const NOTIFICATION_TITLE = "Basic Notification";
  const NOTIFICATION_BODY = "Notification from the Main process";

  autoUpdater.on(
    "update-downloaded",
    (event, releaseNotes, releaseName, date, url) => {
      const dialogOpts: MessageBoxOptions = {
        type: "info",
        buttons: ["Restart", "Later"],
        title: "Application Update",
        message: process.platform === "win32" ? releaseNotes : releaseName,
        detail:
          "A new version has been downloaded. Restart the application to apply the updates.",
      };

      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall();
      });
    }
  );

  autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message =
      log_message +
      " (" +
      progressObj.transferred +
      "/" +
      progressObj.total +
      ")";
    console.log(log_message);
    showNotification("Download Progress", log_message);
  });

  autoUpdater.on("update-downloaded", (info) => {
    const message = "Update downloaded; will install in 5 seconds";
    console.log(message, info);
    showNotification("Update Downloaded", message);
    setTimeout(function () {
      autoUpdater.quitAndInstall();
    }, 5000);
  });

  showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
});

app.on("window-all-closed", () => {
  app.quit();
});
