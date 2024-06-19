import path from 'path';
import { app } from 'electron';
import { ensureJvm, importClass, appendClasspath } from 'java-bridge';

async function initializeJvm() {
  if (!global.jvmInitialized) {
    ensureJvm();
    global.jvmInitialized = true;
  }

  const jarPath = app.isPackaged
    ? path.join(path.dirname(app.getPath('exe')), 'resources', 'assets', 'MyLibrary.jar')
    : path.join(app.getAppPath(), 'assets', 'MyLibrary.jar');

  appendClasspath(jarPath);
  return importClass('MyLibrary');
}

export async function getGreeting(name, callback) {
  try {
    const MyLibrary = await initializeJvm();
    const result = await MyLibrary.getGreeting(name);
    callback(null, result);
  } catch (error) {
    callback(`Error: ${error.message}`, null);
  }
}

export async function add(a, b, callback) {
  try {
    const MyLibrary = await initializeJvm();
    const result = await MyLibrary.add(a, b);
    callback(null, result);
  } catch (error) {
    callback(`Error: ${error.message}`, null);
  }
}
