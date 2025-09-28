import React, { useState, useRef } from "react";

export default function VoiceChat() {
  const [recording, setRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState([]); // [{role:'user',content:'…'},{role:'assistant',content:'…'}]

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setStatus("Gravando…");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = async () => {
      setStatus("Processando…");
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const audioBase64 = await blobToBase64(audioBlob);

      try {
        // 1. Transcrição no servidor
        const transResp = await fetch("http://localhost:3001/api/transcribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64 }),
        });
        const transData = await transResp.json();
        const userText = transData.text;

        // adiciona fala do usuário no chat
        setMessages((prev) => [...prev, { role: "user", content: userText }]);

        // 2. Pergunta ao GPT no servidor
        const gptResp = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        });
        const gptData = await gptResp.json();
        const reply = gptData.reply;

        // adiciona resposta no chat
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

        // 3. Fala a resposta usando síntese de fala do navegador
        speak(reply);

        setStatus("Pronto");
      } catch (err) {
        console.error(err);
        setStatus("Erro ao processar");
      }
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <button
        onClick={recording ? stopRecording : startRecording}
        style={{
          padding: "10px 20px",
          backgroundColor: recording ? "#e74c3c" : "#2ecc71",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        🎤 {recording ? "Parar" : "Falar"}
      </button>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <div
        style={{
          marginTop: 20,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.role === "user" ? "#d1f7c4" : "#f0f0f0",
                borderRadius: 8,
                padding: "8px 12px",
                maxWidth: "80%",
              }}
            >
              <strong>{msg.role === "user" ? "Você" : "Assistente"}:</strong>{" "}
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];
      resolve(base64data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function speak(text) {
  // usa o sintetizador do navegador (SpeechSynthesis)
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR"; // voz em português
    window.speechSynthesis.speak(utterance);
  }
}
