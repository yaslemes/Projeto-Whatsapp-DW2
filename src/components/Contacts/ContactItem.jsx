import React from "react";
import List from "@mui/material/List";
import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onDelete, onEdit }) {
  return (
    <div>
      {/* Título e contador de contatos */}
      <h3 className="subtitle">
        Seus Contatos ({contacts.length})
      </h3>

      {/* Lista de contatos */}
      <List>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}       // ID único do contato
              contact={contact}      // Dados do contato
              onDelete={onDelete}    // Função de deletar
              onEdit={onEdit}        // Função de editar
            />
          ))
        ) : (
          <p className="empty">Nenhum contato salvo</p> // Mensagem quando lista vazia
        )}
      </List>
    </div>
  );
}
