import { useState } from 'react';

export default function ContactForm({ onSaveContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !number) return;
    onSaveContact({ id: Date.now(), name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Número" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
