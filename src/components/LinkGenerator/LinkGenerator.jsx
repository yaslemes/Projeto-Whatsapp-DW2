import React, { useState, useEffect } from "react";
import "./LinkGenerator.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic"; 
import QrCode2Icon from '@mui/icons-material/QrCode2';

export default function LinkGenerator() {
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [linkGerado, setLinkGerado] = useState("");
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  // Inicializa reconhecimento de voz
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "pt-BR";

    speechRecognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setMensagem((prev) => prev + result[0].transcript + " ");
        } else {
          interimTranscript += result[0].transcript;
        }
      }
    };

    setRecognition(speechRecognition);
  }, []);

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

  const handlePhoneChange = (value, country, e, formattedValue) => {
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneRaw(digitsOnly);
    setPhoneDisplay(formattedValue || "+" + digitsOnly);
  };

  const prepararMensagem = () => {
    if (!phoneRaw) return alert("Preencha o número.");
    const mensagemCodificada = encodeURIComponent(mensagem || "");
    const link = `https://wa.me/${phoneRaw}?text=${mensagemCodificada}`;
    setLinkGerado(link);
  };

  const copiarLink = () => {
    if (!linkGerado){
      alert("Gere o link primeiro!");
    return;
  }
    navigator.clipboard.writeText(linkGerado);
    alert("Link copiado com sucesso!");
  };

  const abrirWhatsApp = () => {
    if (!linkGerado) return alert("Gere o link primeiro!");
    window.open(linkGerado, "_blank");
  };

  // Função para alternar QR Code
  const toggleQRCode = () => {
    if (!linkGerado) return alert("Gere o link primeiro!");
    setShowQRCode((prev) => !prev);
  };

  return (
    <form className="link-form">
      {/* Número de telefone */}
      <div className="form-group">
        <label>Seu Número</label>
        <PhoneInput
          country="br"
          value={phoneDisplay}
          onChange={handlePhoneChange}
          containerClass="phone-input-container"
          inputClass="phone-input"
          placeholder="Digite o número"
          masks={{ br: "(..) .....-...." }}
          countryCodeEditable={false}
        />
      </div>

      {/* Mensagem com ícone de áudio à esquerda */}
      <div className="form-group">
        <label>Mensagem (opcional)</label>
        <div style={{ position: "relative" }}>
          <Input
            id="mensagem"
            name="mensagem"
            value={mensagem}
            placeholder="Digite sua mensagem aqui..."
            onChange={(e) => setMensagem(e.target.value)}
          />
          <div className="audio-icon-container" onClick={toggleListening}>
            <MicIcon style={{ color: listening ? "red" : "gray" }} />
          </div>
        </div>
      </div>

      <Button className="buttonIcon" type="button" onClick={prepararMensagem}>
        Preparar Mensagem
        <SendIcon fontSize="small" />
      </Button>

      {/* Link gerado */}
      <div className="generated-link-section">
        <div className="form-group">
          <label htmlFor="link-gerado">Link gerado:</label>
          <div className="link-copy">
            <input
              type="text"
              id="link-gerado"
              readOnly
              value={linkGerado}
              placeholder="Seu link aparecerá aqui"
            />
            <button onClick={copiarLink} type="button" title="Copiar link">
              <ContentCopyIcon fontSize="small" />
            </button>
            <button onClick={toggleQRCode} type="button" title="Gerar QR Code">
              <QrCode2Icon fontSize="small" />
            </button>
          </div>
          {showQRCode && linkGerado && (
            <div className="qrcode-container">
              <QrCode2Icon value={linkGerado} size={128} />
            </div>
          )}
          <Button className="buttonIcon" type="button" onClick={abrirWhatsApp}>
            <WhatsAppIcon />
            Abrir WhatsApp
          </Button>
        </div>
      </div>
    </form>
  );
}
