import React from 'react';
import './App.css';
import LinkGenerator from './components/LinkGenerator/LinkGenerator';
import ContactForm from './components/Contacts/ContactForm';
import ContactList from './components/Contacts/ContactList';

function App() {
  return (
    <div className="App">
      {/* Componentes principais */}
      <LinkGenerator />
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
