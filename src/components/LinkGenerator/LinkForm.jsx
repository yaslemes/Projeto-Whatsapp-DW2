import React, { useState } from "react";
import "./LinkGenerator.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function LinkForm() {
  const [phoneDisplay, setPhoneDisplay] = useState(""); // Telefone formatado para exibir no input
  const [phoneRaw, setPhoneRaw] = useState(""); // Apenas os dígitos do telefone
  const [mensagem, setMensagem] = useState("");
  const [linkGerado, setLinkGerado] = useState("");

  // Atualiza o telefone (formatado e só dígitos)
  const handlePhoneChange = (value, country, e, formattedValue) => {
    const digitsOnly = (value || "").replace(/\D/g, ""); // Remove tudo que não é número
    setPhoneRaw(digitsOnly);
    setPhoneDisplay(formattedValue || "+" + digitsOnly); // Atualiza input com formato
  };

  // Função para preparar a mensagem e gerar o link
  const prepararMensagem = () => {

    if(!phoneRaw) {
      return alert("Preencha o número.");
    }
    const mensagemCodificada = encodeURIComponent(mensagem ||"")
    const link = `https://wa.me/${phoneRaw}?text=${mensagemCodificada}`;
    setLinkGerado(link);
  }

  return (
    <form className="link-form">
      {/* Campo Número */}
      <div className="form-group">
      <label>Seu Número</label>
      <PhoneInput
        country="br"
        value={phoneDisplay} // Input mostra telefone formatado
        onChange={handlePhoneChange}
        containerClass="phone-input-container"
        inputClass="phone-input"
        placeholder="Digite o número"
        masks={{ br: "(..) .....-...." }}
        countryCodeEditable={false} // Impede editar o código do país
      />
      </div>

      {/* Campo Mensagem */}
      <Input
        label="Mensagem (opcional)"
        id="mensagem"
        name="mensagem"
        value={mensagem}
        placeholder="Digite sua mensagem aqui..."
        onChange={(e) => setMensagem(e.target.value)}
      />

      <Button type="button" onClick={prepararMensagem}>
        Preparar Mensagem</Button>

{/* Link Gerado */}
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
            <button>
              <ContentCopyIcon fontSize="small"/>
            </button>
          </div>
        </div>
        {/* Botão Abrir */}
        <Button type="button">Abrir WhatsApp</Button>
      </div>
    </form>
  );
}
