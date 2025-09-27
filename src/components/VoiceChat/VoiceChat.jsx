import React, { useState, useEffect } from "react";

export default function VoiceChat({ onTranscribe }) {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "pt-BR";

    speechRecognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript((prev) => {
            const newTranscript = prev + result[0].transcript + " ";
            onTranscribe?.(newTranscript); // envia para o campo da mensagem
            return newTranscript;
          });
        }
      }
    };

    setRecognition(speechRecognition);
  }, [onTranscribe]);

  const toggleListening = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <button
      className={`microphone-btn ${listening ? "recording" : ""}`}
      onClick={toggleListening}
      title={listening ? "Parar gravação" : "Gravar áudio"}
    >
      🎤
    </button>
  );
}
