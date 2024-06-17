import path from "path";
import { app, ipcMain, Notification } from "electron";
import serve from "electron-serve";
import { createMainWindow } from "./mainWindow";
import { getGreeting, add } from "./javaMethods";
import { autoUpdater } from "electron-updater";
import dotenv from 'dotenv';

dotenv.config();  // Carrega as variáveis de ambiente do .env

console.log('GH_TOKEN:', process.env.GH_TOKEN);

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

app.whenReady().then(async () => {
  await createMainWindow();

  if (isProd) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  ipcMain.handle("getGreeting", async (_event, name: string) => {
    return new Promise((resolve) => {
      getGreeting(name, (error, result) => {
        if (error) {
          resolve({ error });
        } else {
          resolve({ result });
        }
      });
    });
  });

  ipcMain.handle("add", async (_event, a: number, b: number) => {
    return new Promise((resolve) => {
      add(a, b, (error, result) => {
        if (error) {
          resolve({ error });
        } else {
          resolve({ result });
        }
      });
    });
  });

  const NOTIFICATION_TITLE = 'Basic Notification';
  const NOTIFICATION_BODY = 'Notification from the Main process';

  function showNotification(title, body) {
    new Notification({ title: title, body: body }).show();
  }

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...');
    showNotification('Checking for Update', 'Checking for update...');
  });

  autoUpdater.on('update-available', (info) => {
    console.log('Update available.', info);
    showNotification('Update Available', 'Update available.');
  });

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available.', info);
    showNotification('Update Not Available', 'Update not available.');
  });

  autoUpdater.on('error', (err) => {
    console.log('Error in auto-updater.', err);
    showNotification('Error', `Error in auto-updater: ${err}`);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    console.log(log_message);
    showNotification('Download Progress', log_message);
  });

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded; will install in 5 seconds', info);
    showNotification('Update Downloaded', 'Update downloaded; will install in 5 seconds');
    setTimeout(function() {
      autoUpdater.quitAndInstall();
    }, 5000);
  });

  showNotification(NOTIFICATION_TITLE, NOTIFICATION_BODY);
});

app.on("window-all-closed", () => {
  app.quit();
});
