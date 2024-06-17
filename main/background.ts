import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createMainWindow } from "./mainWindow";
import { getGreeting, add } from "./javaMethods";
import { autoUpdater } from "electron-updater";
import dotenv from 'dotenv';

dotenv.config();  // Carrega as variáveis de ambiente do .env

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
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
})();

app.on("window-all-closed", () => {
  app.quit();
});

// Handle update events
autoUpdater.on('update-available', () => {
  console.log('Update available.');
  // Optionally notify the user about the update
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded; will install now');
  autoUpdater.quitAndInstall();
});
