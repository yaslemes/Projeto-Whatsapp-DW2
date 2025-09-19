export default function ContactItem({ contact, onDelete }) {
  return (
    <li>
      {contact.name} — {contact.number}
      <button onClick={() => onDelete(contact.id)}>Excluir</button>
    </li>
  );
}
