import { spawn } from "child_process";

export async function runLlama(prompt) {
  return new Promise((resolve, reject) => {
    let result = "";
    const process = spawn("ollama", ["run", "llama3.2:1b"]);

    process.stdin.write(prompt + "\n");
    process.stdin.end();

    process.stdout.on("data", (data) => {
      result += data.toString();
    });

    process.stderr.on("data", (data) => {
      console.error("⚠️ Ollama error:", data.toString());
    });

    process.on("close", () => {
      resolve(result.trim());
    });

    process.on("error", (err) => {
      reject(err);
    });
  });
}
