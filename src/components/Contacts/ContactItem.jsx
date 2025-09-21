import React from "react";

export default function ContactItem({ contact, onDelete }) {
  const openWhatsApp = () => {
    const num = contact.number.replace(/\D/g, "");
    window.open(`https://wa.me/55${num}`, "_blank");
  };

  return (
    <li className="row">
      <span>{contact.name}</span>
      <span>{contact.number}</span>
      <div className="actions">
        <button onClick={openWhatsApp}>Mensagem</button>
        <button className="delete" onClick={() => onDelete(contact.id)}>
          Excluir
        </button>
      </div>
    </li>
  );
}
