import React, { useState } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator";
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import { PeopleOutlineTwoTone } from "@mui/icons-material";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]); 
  const [editingContact, setEditingContact] = useState(null);

  // Adicionar ou atualizar
  const addOrUpdateContact = (contact) => {
    if (editingContact) {
      setContacts(
        contacts.map((c) => (c.id === editingContact.id ? { ...c, ...contact } : c))
      );
      setEditingContact(null); // Sai do modo edição
    } else {
      setContacts([...contacts, contact]);
    }
  };

  // Remover
  const deleteContact = (id) =>
    setContacts(contacts.filter((c) => c.id !== id));

  // Entrar em modo edição
  const startEdit = (contact) => {
    setEditingContact(contact);
  };

  return (
    <div className="app-container">
      <h1 className="title">WhatsHub</h1>
      <p className="subtitle">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.
      </p>

      <div className="main-content">
        {/* Coluna do Gerador */}
        <div className="column">
          <div className="titulo-icon">
             <AttachFileIcon color="success" />
             <h2>Gerador de Links</h2>

          </div>

          <LinkGenerator />
        </div>

        {/* Coluna da Agenda */}
        <div className="column">
          <div className="titulo-icon">
          <PeopleOutlineTwoTone color="success" />
          <h2>Agenda de Contatos</h2>
          </div>


          <ContactForm 
            onAdd={addOrUpdateContact} 
            editingContact={editingContact} 
          />
          <ContactList 
            contacts={contacts} 
            onDelete={deleteContact} 
            onEdit={startEdit} 
          />
        </div>
      </div>
    </div>
  );
}
