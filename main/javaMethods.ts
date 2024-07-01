import { exec } from 'child_process';

export function sayHello(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`java -cp demo-1.0-SNAPSHOT.jar com.example.App sayHello ${name}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

export function sum(a: number, b: number): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`java -cp demo-1.0-SNAPSHOT.jar com.example.App sum ${a} ${b}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}
