import React from "react";

export default function ContactList({ contacts, onDelete }) {
  if (contacts.length === 0) {
    return <p className="empty">Nenhum contato adicionado ainda.</p>;
  }

  return (
    <table className="contact-table">

      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>{contact.name}</td>
            <td>{contact.number}</td>
            <td>
              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/55${contact.number.replace(/\D/g, "")}`,
                    "_blank"
                  )
                }
              >
                Mensagem
              </button>
              <button className="delete" onClick={() => onDelete(contact.id)}>
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
