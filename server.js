import express from "express";
import cors from "cors";
import { runLlama } from "./ollamaConnector.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Nema prompta" });

  try {
    const response = await runLlama(prompt);
    res.json({ reply: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Moj AI server radi na http://localhost:3000"));
