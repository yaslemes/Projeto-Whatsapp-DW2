import React, { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [dd, setDd] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !dd || !number) return;

    // Formata o número com o DD
    const formattedNumber = `(${dd}) ${number}`;
    onAdd({ id: Date.now(), name, number: formattedNumber });

    // Limpa os campos após adicionar
    setName("");
    setDd("");
    setNumber("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Linha do nome + telefone */}
      <div className="form-row">
        {/* Nome */}
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Número com DD */}
        <div className="number-input">
          {/* Seleção do DD */}
          <div className="form-group-dd">
            <label>DD</label>
            <select value={dd} onChange={(e) => setDd(e.target.value)}>
              <option value="">--</option>
              <option value="11">11</option>
              <option value="21">21</option>
              <option value="31">31</option>
              <option value="41">41</option>
              <option value="51">51</option>
              {/* Adicionar
               outros DDDs */}
            </select>
          </div>

          {/* Número principal */}
          <div className="form-group-number">
            <label>Número</label>
            <input
              type="text"
              placeholder="Digite o número"
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))} // só números
            />
          </div>
        </div>
      </div>

      {/* Botão */}
      <button type="submit">Adicionar</button>
    </form>
  );
}
