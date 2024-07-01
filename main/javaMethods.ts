import path from "path";
import { app } from "electron";
import { exec } from "child_process";

async function callJavaMethod(
  method: string,
  args: string[],
  callback: (error: string | null, result: string | null) => void
) {
  let jarPath;

  if (app.isPackaged) {
    jarPath = path.join(
      path.dirname(app.getPath("exe")),
      "resources",
      "assets",
      "demo-1.0-SNAPSHOT.jar"
    );
  } else {
    jarPath = path.join(app.getAppPath(), "assets", "demo-1.0-SNAPSHOT.jar");
  }
  const command = `java -jar "${jarPath}" ${method} ${args.join(" ")}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(`Error: ${error.message}`, null);
      return;
    }

    if (stderr) {
      callback(`Stderr: ${stderr}`, null);
      return;
    }

    callback(null, stdout.trim());
  });
}

export async function sayHello(
  name: string,
  callback: (error: string | null, result: string | null) => void
) {
  await callJavaMethod("sayHello", [name], callback);
}

export async function sum(
  a: number,
  b: number,
  callback: (error: string | null, result: string | null) => void
) {
  await callJavaMethod("sum", [a.toString(), b.toString()], callback);
}
