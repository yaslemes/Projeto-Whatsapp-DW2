import React from "react";
import List from "@mui/material/List";
import ContactItem from "./ContactItem";

export default function ContactList({ contacts, onDelete, onEdit }) {
  return (
    <div>
      {/* Contador de contatos */}
      <h3 className="subtitle">
        Seus Contatos ({contacts.length})
      </h3>

      <List>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        ) : (
          <p className="empty">Nenhum contato salvo</p>
        )}
      </List>
    </div>
  );
}
