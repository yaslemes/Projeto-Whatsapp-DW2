import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./css/ContactForm.css";

export default function ContactForm({ onAdd, editingContact }) {
  // Estados do formulário
  const [name, setName] = useState("");            // Nome do contato
  const [phoneDisplay, setPhoneDisplay] = useState(""); // Telefone formatado para exibir no input
  const [phoneRaw, setPhoneRaw] = useState("");    // Apenas os dígitos do telefone

  // Preenche o formulário ao editar um contato
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name || "");
      setPhoneDisplay(editingContact.number || "");
      setPhoneRaw(editingContact.rawNumber || "");
    } else {
      setName("");
      setPhoneDisplay("");
      setPhoneRaw("");
    }
  }, [editingContact]);

  // Atualiza o telefone (formatado e só dígitos)
  const handlePhoneChange = (value, country, e, formattedValue) => {
    const digitsOnly = (value || "").replace(/\D/g, ""); // Remove tudo que não é número
    setPhoneRaw(digitsOnly);
    setPhoneDisplay(formattedValue || "+" + digitsOnly); // Atualiza input com formato
  };

  // Envia o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Preencha o nome.");
    if (!phoneRaw) return alert("Preencha o telefone.");

    const contact = {
      id: editingContact?.id || Date.now(), // Mantém ID se estiver editando
      name: name.trim(),
      number: phoneDisplay,
      rawNumber: phoneRaw,
    };

    onAdd(contact); // Chama função para adicionar ou atualizar contato
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>

      {/* Linha do formulário */}
      <div className="form-row">

        {/* Campo Nome */}
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Campo Telefone */}
        <div className="form-group">
          <label>Telefone</label>
          <PhoneInput
            country="br"
            value={phoneDisplay}       // Input mostra telefone formatado
            onChange={handlePhoneChange}
            containerClass="phone-input-container"
            inputClass="phone-input"
            placeholder="Digite o número"
            masks={{ br: "(..) .....-...." }}
            countryCodeEditable={false} // Impede editar o código do país
          />
        </div>

      </div>

      {/* Botão Adicionar ou Salvar Alterações */}
      <button type="submit">
        {editingContact ? "Salvar Alterações" : "Adicionar"}
      </button>
    </form>
  );
}
