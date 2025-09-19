import ContactItem from './ContactItem';

export default function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) return <p>Nenhum contato adicionado ainda.</p>;

  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
      ))}
    </ul>
  );
}
