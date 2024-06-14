import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createMainWindow } from "./mainWindow";
import { getGreeting, add } from "./javaMethods";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await createMainWindow();

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
