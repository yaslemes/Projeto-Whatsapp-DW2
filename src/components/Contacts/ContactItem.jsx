import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./Css/ContactItem.css";

export default function ContactItem({ contact, onDelete, onEdit, isSelected, onSelect }) {
  // Link do WhatsApp com número e mensagem (se houver)
  const whatsappLink = `https://wa.me/${contact.rawNumber}?text=${encodeURIComponent(contact.message || "")}`;

  return (
    <div className="contact-card">

      {/* Checkbox para seleção do contato */}
      <Checkbox
        checked={isSelected}         // Marca se o contato está selecionado
        onChange={onSelect}          // Alterna seleção individual
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          color: "black",
          "&.Mui-checked": { color: "black" },
          transform: "scale(0.8)"   // Tamanho menor
        }}
      />

      {/* Informações do contato */}
      <div className="contact-info">
        <p>{contact.name}</p>
        <span>{contact.number}</span>
        {contact.message && <small>💬 {contact.message}</small>} {/* Mostra mensagem se existir */}
      </div>

      {/* Ações do contato */}
      <div className="contact-actions">
        {/* Botão WhatsApp */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          title="Enviar no WhatsApp"
        >
          <WhatsAppIcon color="success" />
        </a>

        {/* Botão Editar */}
        <button onClick={() => onEdit(contact)} title="Editar">
          <EditIcon color="success" />
        </button>

        {/* Botão Excluir */}
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
