import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Css/ContactForm.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Alert from "@mui/material/Alert";

export default function ContactForm({ onAdd, editingContact }) {
  // Estados do formulário
  const [name, setName] = useState(""); // Nome do contato
  const [phoneDisplay, setPhoneDisplay] = useState(""); // Telefone formatado
  const [phoneRaw, setPhoneRaw] = useState(""); // Apenas dígitos
  const [erro, setErro] = useState("");// Mensagem de erro

  useEffect(() => { // Preenche o formulário se estiver editando
    if (editingContact) {
      setName(editingContact.name || "");
      setPhoneDisplay(editingContact.number || "");

      const digitsOnly = (editingContact.number || "").replace(/\D/g, "");
      setPhoneRaw(digitsOnly);
    } else {
      setName("");
      setPhoneDisplay("");
      setPhoneRaw("");
    }
  }, [editingContact]);

  const handlePhoneChange = (value, country, e, formattedValue) => {
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneRaw(digitsOnly);
    setPhoneDisplay(formattedValue || "+" + digitsOnly);
  };
  // Envia formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
    setErro("Preencha o nome.");
    setTimeout(() => setCopied(""), 2000);
    return;
  }
  if (!phoneRaw) {
    setErro("Preencha o número.");
    setTimeout(() => setCopied(""), 2000);
    return;
  }
  if (phoneRaw.length < 11) {
    setErro("Número incompleto. Verifique o DDD e o número.");
    setTimeout(() => setCopied(""), 2000);
    return;
  }

    const contact = {
      name: name.trim(),
      number: phoneDisplay,
      rawNumber: phoneRaw,
    };

    onAdd(contact);
    setErro("");
    // Limpar formulário se for um novo contato
    if (!editingContact) {
      setName("");
      setPhoneDisplay("");
      setPhoneRaw("");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Linha do formulário */}
      <div className="form-row">
        {/* Campo Nome */}
        <Input
          label="Nome"
          placeholder="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          // Adiciona onKeyDown para evitar bugs com Enter em componentes personalizados
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />

        {/* Campo Telefone */}
        <div className="form-group">
          <label>Telefone</label>
          <PhoneInput
            country="br"
            value={phoneDisplay}
            onChange={handlePhoneChange}
            containerClass="phone-input-container"
            inputClass="phone-input"
            placeholder="Digite o número"
            masks={{ br: "(..) .....-...." }}
            countryCodeEditable={false}
            // Captura Enter também aqui
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
      </div>

      {/* Erros */}
      {erro && <Alert severity="error">{erro}</Alert>}

      {/* Botão Adicionar/Salvar */}
      <Button
        className={`buttonIcon ${editingContact ? "edit-mode" : "add-mode"}`}
        type="submit"
      >
        {editingContact ? "Salvar Alterações" : "Adicionar"}{" "}
        <PersonAddAlt1Icon />
      </Button>
    </form>
  );
}
