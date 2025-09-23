// Seu arquivo ContactItem.jsx
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./css/ContactItem.css";

export default function ContactItem({ contact, onDelete, onEdit }) {
  const whatsappLink = `https://wa.me/${contact.rawNumber}?text=${encodeURIComponent(
    contact.message || ""
  )}`;

  return (
    // Adicionamos a classe da animação aqui
    <div className="contact-card contact-item-animation">
      <div className="contact-info">
        <strong>{contact.name}</strong>
        <span>{contact.number}</span>
        {contact.message && <small>💬 {contact.message}</small>}
      </div>

      <div className="contact-actions">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Enviar no WhatsApp"
        >
          <WhatsAppIcon color="success" />
        </a>
        <button onClick={() => onEdit(contact)} title="Editar">
          <EditIcon color="success" />
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="delete"
          title="Excluir"
        >
          <DeleteIcon color="error" />
        </button>
      </div>
    </div>
  );
}