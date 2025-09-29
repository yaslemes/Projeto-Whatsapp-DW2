// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rota raiz para testar no navegador
app.get("/", (req, res) => {
  res.send("Servidor Express rodando 🚀");
});

// (Opcional) exemplo de endpoint sem IA
app.post("/api/transcribe", (req, res) => {
  // Apenas um mock — devolve um texto fixo
  res.json({ text: "Aqui entraria o texto transcrito (mock)" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
