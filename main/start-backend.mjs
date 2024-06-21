import { spawn } from 'child_process';
import path from 'path';

const getBackendPath = (isPackaged) => {
  return isPackaged
    ? path.join(path.dirname(process.execPath), 'resources', 'assets', 'demo-0.0.1-SNAPSHOT.jar')
    : path.join(__dirname, '..', 'assets', 'demo-0.0.1-SNAPSHOT.jar');
};

const startBackend = (isPackaged) => {
  return new Promise((resolve, reject) => {
    const backendPath = getBackendPath(isPackaged);
    const backend = spawn('java', ['-jar', backendPath]);

    backend.stdout.on('data', (data) => {
      console.log(`Backend: ${data}`);
    });

    backend.stderr.on('data', (data) => {
      console.error(`Backend Error: ${data}`);
    });

    backend.on('close', (code) => {
      console.log(`Backend process exited with code ${code}`);
      resolve();
    });

    resolve(backend);
  });
};

export default startBackend;
