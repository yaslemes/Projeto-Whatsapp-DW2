import React, { useState } from 'react';
import './App.css';
import LinkGenerator from './components/LinkGenerator/LinkGenerator';
import ContactForm from './components/Contacts/ContactForm';
import ContactList from './components/Contacts/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="App" style={{ padding: '1rem' }}>
      <LinkGenerator />
      <h2>Agenda de Contatos</h2>
      <ContactForm onSaveContact={handleAddContact} />
      <ContactList contacts={contacts} onDelete={handleDeleteContact} />
    </div>
  );
}

export default App;
