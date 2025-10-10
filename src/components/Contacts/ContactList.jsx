import React from "react";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ContactItem from "./ContactItem";
import "./Css/ContactList.css";

export default function ContactList({
  contacts,               // Lista de contatos
  onDelete,               // Função para deletar um contato
  onEdit,                 // Função para editar um contato
  onMessage,              // Função para preencher LinkGenerator
  selectedContacts,       // IDs dos contatos selecionados
  toggleContactSelection, // Seleciona/desmarca um contato individual
  toggleAllContacts,      // Seleciona/desmarca todos os contatos
  deleteSelectedContacts  // Deleta todos os contatos selecionados
}) {
  return (
    <div className="contact-list-container">

      {/* Checkbox Selecionar Todos: só aparece se houver contatos */}
      {contacts.length > 0 && (
        <div className="select-all-container">
          <Checkbox
            checked={selectedContacts.length === contacts.length} // Marca se todos selecionados
            onChange={toggleAllContacts}                          // Alterna seleção de todos
            icon={<RadioButtonUncheckedIcon />}                   // Ícone desmarcado
            checkdedIcon={<CheckCircleIcon />}                     // Ícone marcado
            sx={{ color: "black", "&.Mui-checked": { color: "black" }, transform: "scale(0.8)" }}
          />
          <span>Selecionar Todos</span>
        </div>
      )}

      {/* Lista de contatos */}
      <div className="contact-list">
        {contacts.length === 0 && <p>Nenhum contato cadastrado.</p>}
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onEdit={onEdit}
            onMessage={onMessage}              // Passa função para preencher LinkGenerator
            isSelected={selectedContacts.includes(contact.id)} // Indica se o contato está selecionado
            onSelect={() => toggleContactSelection(contact.id)} // Alterna seleção individual
          />
        ))}
      </div>

      {/* Botão Excluir Selecionados: aparece só se houver seleção */}
      {selectedContacts.length > 0 && (
        <button className="delete-selected-btn" onClick={deleteSelectedContacts}>
          Excluir Selecionados ({selectedContacts.length})
        </button>
      )}

    </div>
  );
}
