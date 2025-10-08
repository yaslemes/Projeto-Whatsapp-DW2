import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleStart = () => {
    setIsExiting(true);

    // Aguarda o fim da animação (1 segundo) antes de trocar de tela
    setTimeout(() => {
      navigate("/app"); // altere a rota conforme sua estrutura
    }, 1000);
  };

  return (
    <div className={`welcome-page ${isExiting ? "fade-out" : ""}`}>
      <div className="content">
        <div className="logo-container">
          <h1 className="logo-text">WhatsUp!</h1>
          <div className="logo-icon">
            {/* Ícone SVG do WhatsApp */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              width="55"
              height="55"
              fill="#25D366"
            >
              <path d="M16.001 3C9.382 3 4 8.383 4 15.001c0 2.652.867 5.115 2.331 7.128L5 29l7.016-1.792a12.941 12.941 0 0 0 3.985.611C22.619 27.819 28 22.436 28 15.819S22.619 3 16.001 3zm0 23.819a10.97 10.97 0 0 1-3.468-.55l-.248-.081-4.164 1.063 1.109-4.054-.102-.253A10.766 10.766 0 0 1 5.23 15c0-5.95 4.822-10.772 10.771-10.772 5.949 0 10.771 4.822 10.771 10.772 0 5.949-4.822 10.771-10.771 10.771zm5.873-8.091c-.322-.162-1.902-.939-2.197-1.046-.295-.108-.51-.162-.724.161-.215.323-.83 1.046-1.018 1.26-.187.216-.374.243-.696.081-.322-.162-1.359-.501-2.589-1.598-.957-.854-1.602-1.91-1.789-2.233-.187-.323-.02-.497.142-.659.146-.145.322-.374.483-.561.161-.187.215-.323.322-.539.108-.216.054-.405-.027-.567-.081-.161-.724-1.747-.993-2.398-.262-.629-.528-.545-.724-.554l-.618-.011c-.216 0-.567.081-.864.405-.295.323-1.132 1.107-1.132 2.701s1.16 3.133 1.321 3.35c.162.216 2.286 3.49 5.54 4.896.774.334 1.377.533 1.846.681.775.247 1.479.212 2.036.129.622-.093 1.902-.776 2.171-1.523.269-.748.269-1.389.187-1.523-.08-.135-.295-.216-.617-.377z" />
            </svg>
          </div>
        </div>

        <p className="subtitle">
          O jeito mais rápido de iniciar conversas no WhatsApp!
        </p>

        <button className="start-btn" onClick={handleStart}>
          Começar
        </button>

        <div className="features">
          <div className="card">
            <h3>Rápido</h3>
            <p>Inicie conversas em segundos</p>
          </div>
          <div className="card">
            <h3>Seguro</h3>
            <p>Seus dados protegidos</p>
          </div>
          <div className="card">
            <h3>Simples</h3>
            <p>Interface intuitiva</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        © 2025 <span className="brand">WhatsUp!</span> – Desenvolvido por Isabely Turquino e Yasmym Lemes
      </footer>
    </div>
  );
}
