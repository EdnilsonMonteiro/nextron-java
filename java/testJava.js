const { exec } = require("child_process");

exec("java -jar HelloWorld.jar", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Stdout: ${stdout}`);
});
