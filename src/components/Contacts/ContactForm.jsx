import React, { useState } from "react";

// Form para os adicionar contatos
export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");       
  const [number, setNumber] = useState("");   

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;             // Não adiciona se algum campo estiver vazio
    onAdd({ id: Date.now(), name, number });  // Adiciona contato com id único
    setName("");                               // Limpa o campo após adicionar
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        placeholder="Nome do contato"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Número do WhatsApp"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button type="submit">Salvar na Agenda</button>
    </form>
  );
}
