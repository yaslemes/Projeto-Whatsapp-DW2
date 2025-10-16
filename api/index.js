export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).send("Servidor Express rodando 🚀 (serverless)");
  } else {
    res.status(405).send("Método não permitido");
  }
}
