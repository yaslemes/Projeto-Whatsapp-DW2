// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Cria cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Rota raiz para testar no navegador
app.get("/", (req, res) => {
  res.send("Servidor Express com IA rodando 🚀");
});

// Rota para Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ou outro modelo que preferir
      messages: [
        { role: "system", content: "Você é um assistente útil." },
        { role: "user", content: message },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no chat IA" });
  }
});

// Rota para Transcrição (exemplo com áudio base64)
app.post("/api/transcribe", async (req, res) => {
  try {
    const { audioBase64 } = req.body;

    // Cria um buffer com o áudio base64
    const audioBuffer = Buffer.from(audioBase64, "base64");

    const transcription = await openai.audio.transcriptions.create({
      file: audioBuffer,
      model: "gpt-4o-mini-transcribe", // ou "whisper-1"
    });

    res.json({ text: transcription.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na transcrição IA" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
