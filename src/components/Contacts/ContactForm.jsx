import React, { useState } from "react";

// Form para adicionar contatos
export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;
    onAdd({ id: Date.now(), name, number });
    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      {/* Inputs lado a lado, cada um com seu label */}
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
          <label>Número</label>
          <input
            type="text"
            placeholder="Digite o número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar na Agenda</button>
    </form>
  );
}
