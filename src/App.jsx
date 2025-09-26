import React, { useState } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator";
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import PeopleOutlineTwoTone from "@mui/icons-material/PeopleOutlineTwoTone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import "./App.css";

export default function App() {
  // lista de contatos
  const [contacts, setContacts] = useState([]);
  // contato que está sendo editado
  const [editingContact, setEditingContact] = useState(null);
  // ids dos contatos selecionados
  const [selectedContacts, setSelectedContacts] = useState([]);
  // tema atual (claro ou escuro)
  const [theme, setTheme] = useState("light");

  // alterna entre tema claro e escuro
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // adiciona ou atualiza um contato
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

  // exclui um contato
  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // inicia a edição de um contato
  const startEdit = (contact) => {
    setEditingContact(contact);
  };

  // seleciona ou desseleciona um contato
  const toggleContactSelection = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  // seleciona ou desseleciona todos os contatos
  const toggleAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  // exclui todos os contatos selecionados
  const deleteSelectedContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  return (
    <div className={`app-container ${theme}`}>
      {/* Cabeçalho: título + botão para trocar tema */}
      <div className="header">
        <h1 className="title">WhatsUp!</h1>
        <button
          className="toggle-theme-btn"
          onClick={toggleTheme}
          aria-label="Trocar tema"
        >
          {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </button>
      </div>

      {/* Subtítulo */}
      <p className="subtitle">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.
      </p>

      {/* Área principal com duas colunas */}
      <div className="main-content">
        {/* Coluna do gerador de links */}
        <div className="column">
          <div className="titulo-icon">
            <AttachFileIcon color="success" />
            <h2>Gerador de Links</h2>
          </div>
          <LinkGenerator />
        </div>

        {/* Coluna da agenda de contatos */}
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
