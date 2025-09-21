import React from "react";
import ButtonMui from "@mui/material/Button";

export default function Button({ onClick, children, color = "primary", variant = "contained", startIcon, endIcon }) {
  return (
    <ButtonMui
      onClick={onClick}
      color={color}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </ButtonMui>
  );
}
