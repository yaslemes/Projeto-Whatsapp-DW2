import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./css/ContactForm.css";

export default function ContactForm({ onAdd, editingContact }) {
  const [name, setName] = useState("");
  const [phoneDisplay, setPhoneDisplay] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name || "");
      if (editingContact.rawNumber) {
        setPhoneRaw(editingContact.rawNumber.replace(/\D/g, ""));
        setPhoneDisplay(editingContact.number || "");
      } else {
        const digits = (editingContact.number || "").replace(/\D/g, "");
        setPhoneRaw(digits);
        setPhoneDisplay(editingContact.number || "");
      }
    }
  }, [editingContact]);

  const handlePhoneChange = (value, country, e, formattedValue) => {
    const digitsOnly = (value || "").replace(/\D/g, "");
    setPhoneRaw(digitsOnly);
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
    setName("");
    setPhoneDisplay("");
    setPhoneRaw("");
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
            value={phoneRaw || ""}
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
