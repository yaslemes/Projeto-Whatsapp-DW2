import React, { useState, useEffect } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator";
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import PeopleOutlineTwoTone from "@mui/icons-material/PeopleOutlineTwoTone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import "./App.css";

// Componente de Chat de Voz com transcrição
function VoiceChat() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }
    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = "pt-BR";

    speechRecognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript((prev) => prev + result[0].transcript + " ");
        } else {
          interimTranscript += result[0].transcript;
        }
      }
    };

    setRecognition(speechRecognition);
  }, []);

  const toggleListening = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="voice-chat">
      <button onClick={toggleListening}>
        {listening ? "Parar gravação" : "Gravar áudio"}
      </button>
      <div className="transcript">
        <h3>Transcrição:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default function App() {
  // Lista de contatos
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

  // Alterna tema claro/escuro
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Adiciona ou atualiza contato
  const addOrUpdateContact = (contact) => {
      console.log("Adicionando contato:", contact);

    if (editingContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );
    } else {
        const newContact = { ...contact, id: crypto.randomUUID(),}; // cria ID único
      setContacts((prev) => [...prev, newContact]);
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
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  const deleteSelectedContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  // Filtra contatos por pesquisa
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.rawNumber.includes(searchTerm)
  );

  return (
    <div className={`app-container ${theme}`}>
      {/* Cabeçalho */}
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

      <p className="subtitle">
        O jeito mais rápido de iniciar conversas no WhatsApp. Gere links
        instantâneos, mantenha seus contatos organizados e use chat de voz.
      </p>

      <div className="main-content">
        {/* Coluna Gerador de Links */}
        <div className="column">
          <div className="titulo-icon">
            <AttachFileIcon color="success" />
            <h2>Gerador de Links</h2>
          </div>
          <LinkGenerator />
        </div>

        {/* Coluna Agenda + Chat de Voz */}
        <div className="column">
          <div className="titulo-icon">
            <PeopleOutlineTwoTone color="success" />
            <h2>Agenda de Contatos</h2>
          </div>

          <ContactForm
            key={editingContact?.id || contacts.length}
            onAdd={addOrUpdateContact}
            editingContact={editingContact}
          />

          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <ContactList
            contacts={filteredContacts}
            onDelete={deleteContact}
            onEdit={startEdit}
            selectedContacts={selectedContacts}
            toggleContactSelection={toggleContactSelection}
            toggleAllContacts={toggleAllContacts}
            deleteSelectedContacts={deleteSelectedContacts}
          />

          {filteredContacts.length === 0 && contacts.length > 0 && (
            <p className="no-results">Nenhum contato encontrado.</p>
          )}

        
        </div>
      </div>
    </div>
  );
}
