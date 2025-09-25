import React from "react";
import "./LinkGenerator.css"
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function LinkForm() {
  return (
    <form className="link-form">
      {/* Campo Número */}
      
      <Input
      label="Número do WhatsApp"
      id="numero"
      name="numero"
      type="tel"
      placeholder="Digite seu número"
      />

      {/* Campo Mensagem */}
      <Input
        label="Mensagem (opcional)"
        id="mensagem"
        name="mensagem"
        placeholder="Digite sua mensagem aqui..."
      />

      <Button type="button">
            Preparar Mensagem
      </Button>

      {/* Link Gerado */}
      <div className="form-group">
        <label htmlFor="link-gerado">Link gerado:</label>
        <input type="text" id="link-gerado" readOnly value="https://wa.me/" />
      </div>

      {/* Botão Abrir */}
      <Button type="button">
        Abrir WhatsApp
      </Button>
    </form>
  );
}
