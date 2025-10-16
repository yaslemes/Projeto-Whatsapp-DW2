import React, { useState, useEffect } from "react";
import LinkGenerator from "./components/LinkGenerator/LinkGenerator";
import ContactForm from "./components/Contacts/ContactForm";
import ContactList from "./components/Contacts/ContactList";
import PeopleOutlineTwoTone from "@mui/icons-material/PeopleOutlineTwoTone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { supabase } from "./supabaseClient";
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
  // Alterna estado de escuta
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

  // Adicionar ou atualizar contato
 const addOrUpdateContact = async (contact) => {
  if (editingContact) {
    // Atualiza registro existente usando o ID do editingContact
    const { error } = await supabase
      .from("contacts")
      .update({
        name: contact.name,
        number: contact.number,
      })
      .eq("id", editingContact.id);

    if (error) console.error(error);
  } else {
    // Cria novo contato
    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: contact.name,
          number: contact.number,
        }
      ]);

    if (error) console.error(error);
  }

  setEditingContact(null);  // limpa o modo edição
  await fetchContacts();    // atualiza lista
};

  // Deletar contato individual
  const deleteContact = async (id) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (error) console.error(error);
    fetchContacts();
  };

  // Editar contato
  const startEdit = (contact) => setEditingContact(contact);

  // Seleção múltipla
  const toggleContactSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };
  // Selecionar ou desmarcar todos
  const toggleAllContacts = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map((contact) => contact.id));
    }
  };

  //  Deletar contatos selecionados
  const deleteSelectedContacts = async () => {
    const { error } = await supabase
      .from("contacts")
      .delete()
      .in("id", selectedContacts);
    if (error) console.error(error);
    setSelectedContacts([]);
    fetchContacts();
  };

  // Filtra contatos por nome ou número
  const filteredContacts = contacts.filter( 
    (c) => // 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.number.includes(searchTerm)
  );

  const fetchContacts = async () => { // Busca contatos no Supabase
    const { data, error } = await supabase
      .from("contacts")
      .select("id, name, number, created_at")
      .order("created_at", { ascending: false }); // Mais recentes primeiro

    if (error) console.error(error);
    else setContacts(data);
  };
  useEffect(() => {
    fetchContacts(); 
  }, []);

  const [selectedContact, setSelectedContact] = useState(null); // Contato selecionado para o LinkGenerator


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
          <LinkGenerator  selectedContact={selectedContact} />

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
            onChange={(e) => setSearchTerm(e.target.value)} // Atualiza termo de busca
            className="search-input"
          />

          <ContactList // Lista de contatos com todas as funcionalidades
            contacts={filteredContacts} 
            onDelete={deleteContact}
            onEdit={startEdit}
            onMessage={setSelectedContact}     
            selectedContacts={selectedContacts}
            toggleContactSelection={toggleContactSelection}
            toggleAllContacts={toggleAllContacts}
            deleteSelectedContacts={deleteSelectedContacts}
          />
          {/* Se não achar nada na busca */}
          {filteredContacts.length === 0 && contacts.length > 0 && ( 
            <p className="no-results">Nenhum contato encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
