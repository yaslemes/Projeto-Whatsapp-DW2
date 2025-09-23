import React, { useState } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator";
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import { PeopleOutlineTwoTone } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const addOrUpdateContact = (contact) => {
    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
    } else {
      setContacts((prev) => [...prev, contact]);
    }
    setEditingContact(null);
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const startEdit = (contact) => {
    setEditingContact(contact);
  };

  const toggleContactSelection = (id) => {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((contactId) => contactId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const toggleAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      const allContactIds = contacts.map((contact) => contact.id);
      setSelectedContacts(allContactIds);
    }
  };

  const deleteSelectedContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  return (
    <div className="app-container">
      <h1 className="title">WhatsUp!</h1>
      <p className="subtitle">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.
      </p>

      <div className="main-content">
        <div className="column">
          <div className="titulo-icon">
            <AttachFileIcon color="success" />
            <h2>Gerador de Links</h2>
          </div>
          <LinkGenerator />
        </div>

        <div className="column">
          <div className="titulo-icon">
            <PeopleOutlineTwoTone color="success" />
            <h2>Agenda de Contatos</h2>
          </div>

          <ContactForm
            key={editingContact?.id || "add-mode"}
            onAdd={addOrUpdateContact}
            editingContact={editingContact}
          />

          <ContactList
            contacts={contacts}
            onDelete={deleteContact}
            onEdit={startEdit}
            selectedContacts={selectedContacts}
            toggleContactSelection={toggleContactSelection}
            toggleAllContacts={toggleAllContacts}
            deleteSelectedContacts={deleteSelectedContacts}
          />
        </div>
      </div>
    </div>
  );
}
