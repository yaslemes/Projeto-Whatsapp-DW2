import React from "react";
import List from "@mui/material/List";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ContactList({ contacts, onDelete }) {
  const openWhatsApp = (number) => {
    const num = number.replace(/\D/g, "");
    window.open(`https://wa.me/55${num}`, "_blank");
  };

  return (
    <List>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          divider
          secondaryAction={
            <Stack direction="row" spacing={1}>
              <IconButton color="success" onClick={() => openWhatsApp(contact.number)}>
                <WhatsAppIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(contact.id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText primary={contact.name} secondary={contact.number} />
        </ListItem>
      ))}
    </List>
  );
}
