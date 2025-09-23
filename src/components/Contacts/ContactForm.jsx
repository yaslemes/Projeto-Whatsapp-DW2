import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./css/ContactForm.css";

export default function ContactForm({ onAdd, editingContact }) {
  const [name, setName] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState(""); // formatado para mostrar no input
  const [phoneRaw, setPhoneRaw] = useState(""); // só os dígitos

  // Preenche quando estiver editando
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name || "");
      // coloca já o número formatado no input
      setPhoneDisplay(editingContact.number || "");
      setPhoneRaw(editingContact.rawNumber || "");
    } else {
      setName("");
      setPhoneDisplay("");
      setPhoneRaw("");
    }
  }, [editingContact]);

  const handlePhoneChange = (value, country, e, formattedValue) => {
    // `value` já vem com o código do país
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneRaw(digitsOnly);
    // usa formattedValue para exibir no input
    setPhoneDisplay(formattedValue || "+" + digitsOnly);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Preencha o nome.");
    if (!phoneRaw) return alert("Preencha o telefone.");

    const contact = {
      id: editingContact?.id || Date.now(),
      name: name.trim(),
      number: phoneDisplay,
      rawNumber: phoneRaw,
    };

    onAdd(contact);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <PhoneInput
            country="br"
            value={phoneDisplay} // 👈 usa o formatado
            onChange={handlePhoneChange}
            containerClass="phone-input-container"
            inputClass="phone-input"
            placeholder="Digite o número"
            masks={{ br: "(..) .....-...." }}
            countryCodeEditable={false}
          />
        </div>
      </div>

      <button type="submit">
        {editingContact ? "Salvar Alterações" : "Adicionar"}
      </button>
    </form>
  );
}
