import React from "react";
import TextField from "@mui/material/TextField";

export default function Input({ value, onChange, label, placeholder, type = "text", fullWidth = true }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      size="small"
    />
  );
}
