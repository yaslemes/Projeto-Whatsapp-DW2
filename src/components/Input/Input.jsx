import React from "react";
import "./Input.css"; 

export default function Input({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
