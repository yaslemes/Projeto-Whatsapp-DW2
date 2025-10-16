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
import QRCode from "react-qr-code";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import Alert from "@mui/material/Alert";

export default function LinkGenerator({ selectedContact }) {
  const [phoneDisplay, setPhoneDisplay] = useState(""); // Telefone formatado
  const [phoneRaw, setPhoneRaw] = useState(""); // Apenas dígitos
  const [mensagem, setMensagem] = useState(""); // Mensagem opcional
  const [linkGerado, setLinkGerado] = useState("");// Link gerado
  const [listening, setListening] = useState(false); // Estado de escuta
  const [recognition, setRecognition] = useState(null); // Reconhecimento de voz
  const [showQRCode, setShowQRCode] = useState(false); // Mostra/oculta QR Code
  const [erro, setErro] = useState(""); // Mensagem de erro
  const [copied, setCopied] = useState(""); // Mensagem de sucesso

  // Atualiza campos quando um contato é selecionado
  useEffect(() => {
    if (selectedContact) {
      const numeroLimpo = (
        selectedContact.rawNumber ||
        selectedContact.number ||
        ""
      ).replace(/\D/g, "");
      setPhoneRaw(numeroLimpo);
      setPhoneDisplay(selectedContact.number || "");
      setMensagem(selectedContact.message || "");
    }
  }, [selectedContact]);

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

  const handlePhoneChange = (value, country, e, formattedValue) => { // value é o número completo
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneRaw(digitsOnly); // Apenas os dígitos
    setPhoneDisplay(formattedValue || "+" + digitsOnly);
  };

  const prepararMensagem = () => { // Gera o link
    if (!phoneRaw) return alert("Preencha o número.");
    const mensagemCodificada = encodeURIComponent(mensagem || "");
    const link = `https://wa.me/${phoneRaw}?text=${mensagemCodificada}`;
    setLinkGerado(link);
  };

  const copiarLink = () => { // Copia o link para a área de transferência
    if (!linkGerado) {
      setErro("Gere o link primeiro!");
      setTimeout(() => setErro(""), 2000);
      return;
    }
    navigator.clipboard.writeText(linkGerado).then(() => {
      setCopied("Link copiado com sucesso!");
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const abrirWhatsApp = () => { // Abre o link direto no WhatsApp
    if (!linkGerado) {
      setErro("Gere o link primeiro!");
      setTimeout(() => setErro(""), 2500);
      return;
    }
    window.open(linkGerado, "_blank");
  };

  const toggleQRCode = () => { // Mostra/oculta o QR Code
    if (!linkGerado) {
      setErro("Gere o link primeiro!");
      setTimeout(() => setErro(""), 2000);
      return;
    }
    setShowQRCode((prev) => !prev);
  };

  return (
    <form
      className="link-form"
      onSubmit={(e) => {
        e.preventDefault();
        prepararMensagem();
      }}
    >
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
          masks={{ br: "(..) .....-...." }} // Máscara para Brasil
          countryCodeEditable={false} // Não permite editar o código do país
        />
      </div>

      {/* Mensagem com ícone de áudio */}
      <div className="form-group">
        <label>Mensagem (opcional)</label>
        <div style={{ position: "relative" }}>
          <Input
            id="mensagem"
            name="mensagem"
            type="text"
            value={mensagem}
            placeholder="Digite sua mensagem aqui..."
            onChange={(e) => setMensagem(e.target.value)} // Atualiza mensagem
            onKeyDown={(e) => { // Habilita enviar com a tecla Enter
          if (e.key === "Enter") { 
            e.preventDefault();
            prepararMensagem();
          }}}
          />
          <div className="audio-icon-container" onClick={toggleListening}> 
            <MicIcon style={{ color: listening ? "red" : "gray" }} /> 
          </div>
        </div>
      </div>

      <Button className="buttonIcon" type="submit">
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
          { /* Mensagens de erro e sucesso */ }
          {erro && <Alert severity="error">{erro}</Alert>}
          {copied && <Alert severity="success">{copied}</Alert>}

          {showQRCode && linkGerado && (
            <div className="qrcode-container">
              <QRCode value={linkGerado} size={128} />
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
