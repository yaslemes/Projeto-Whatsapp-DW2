export default function handler(req, res) {
  if (req.method === "POST") {
    const { audio } = req.body || {};
    res.status(200).json({ text: "Aqui entraria o texto transcrito (mock)" });
  } else {
    res.status(405).send("Método não permitido");
  }
}
