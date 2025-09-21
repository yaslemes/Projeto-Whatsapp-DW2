import React, { useState } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator"; // Gerador da sua amiga
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import "./App.css";

export default function App() {
  const [contacts, setContacts] = useState([]); // Lista de contatos

  // Função para adicionar contato
  const addContact = (contact) => setContacts([...contacts, contact]);

  // Função para remover contato
  const deleteContact = (id) =>
    setContacts(contacts.filter((c) => c.id !== id));

  return (
    <div className="app-container">
      <h1 className="title">WhatsHub</h1>
      <p className="subtitle">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links instantâneos e mantenha seus contatos organizados.
      </p>

      <div className="main-content">
        {/* Coluna do Gerador */}
        <div className="column">
          <h2>Gerador de Links</h2>
          <LinkGenerator />
        </div>

        {/* Coluna da Agenda */}
        <div className="column">
          <h2>Agenda de Contatos</h2>
          <ContactForm onAdd={addContact} />
          <ContactList contacts={contacts} onDelete={deleteContact} />
        </div>
      </div>
    </div>
  );
}
