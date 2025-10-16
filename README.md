# 💬 WhatsUp!

Aplicação web desenvolvida como projeto da disciplina Desenvolvimento Web II (DW2). O WhatsUp! facilita a criação de links e QR Codes para o WhatsApp, armazena e gerencia contatos.

## 👩‍💻 Autoras
- Isabely Turquino  
- Yasmym Lemes

## 🚀 Acesse o Projeto
[https://projeto-whatsapp-dw2.vercel.app/](https://projeto-whatsapp-dw2.vercel.app/)

## 🧭 Visão Geral
O **WhatsUp!** é desenvolvido com **React JS**, **CSS puro** e **Material UI**, integrado com **Supabase** para gerenciamento de contatos e **Vercel** para deploy com serverless functions.  
A aplicação conta com uma **página inicial simples**, contendo um botão **“Começar”** que leva o usuário para a interface principal do sistema.  
O sistema possui duas áreas principais: **Gerador de Links** e **Agenda de Contatos**, oferecendo praticidade, interatividade e eficiência ao usuário.

## 🧩 Funcionalidades Principais
### 🏠 Página Inicial
- Página de boas-vindas simples com botão “Começar”  
- Direciona o usuário para a aplicação principal

### 📱 Gerador de Links do WhatsApp
- Entrada de número de telefone com formatação automática 
- Campo para mensagem personalizada  
- Geração automática de links no formato `wa.me`  
- Opções para copiar o link, gerar QR Code ou abrir diretamente no WhatsApp

### 📂 Agenda de Contatos
- Operações de CRUD completas com integração ao Supabase  
- Botão para integração com o Gerador de Links  
- Pesquisa rápida para localizar contatos pelo nome ou número  
- Cada contato contém: `id`, `created_at`, `name` e `number`

## 💡 Funcionalidades Extras
### 🎙️ Transcrição de Áudio para Mensagens
- O usuário pode gravar sua voz diretamente na aplicação  
- A gravação é convertida automaticamente em texto e preenchida no campo de mensagem do Gerador de Links  
- Facilita o envio de mensagens sem digitação, tornando a aplicação mais prática e acessível

### 🖼️ Geração Automática de QR Code
- Cada link criado gera um QR Code correspondente usando `react-qr-code`  
- Permite compartilhar ou abrir a conversa em outro dispositivo apenas escaneando o código

### 🌗 Modo Claro e Escuro 
- Alternância rápida entre temas claro e escuro para melhor experiência visual  

## 🛠️ Tecnologias Utilizadas
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Material UI](https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![react-phone-input-2](https://img.shields.io/badge/react--phone--input--2-2.15.1-ff69b4?style=for-the-badge&logo=react&logoColor=white)
![react-qr-code](https://img.shields.io/badge/react--qr--code-2.7.0-4caf50?style=for-the-badge&logo=qrcode&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react&logoColor=white)
![Web Speech API](https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

### Frontend

- React — Biblioteca principal da interface
- CSS Puro — Estilização personalizada
- Material UI (MUI) — Componentes visuais
- react-phone-input-2 — Entrada de telefone com máscara
- react-qr-code — Geração de QR Codes
- react-router-dom — Navegação entre páginas
- Web Speech API — Transcrição de voz para texto
- Lucide-react — Ícones modernos

### Backend e Banco de Dados

- Supabase — Armazenamento e gerenciamento de contatos
- Vercel Serverless Functions — Deploy e pequenas funções de backend
- Node.js — Ambiente de execução JavaScript
- Express — Servidor e middlewares
- dotenv — Gerenciamento de variáveis de ambiente

## ⚡ Como Rodar Localmente

### 🧩 Pré-requisitos
- Node.js instalado  
- Conta no [Supabase](https://supabase.com/)  
- Arquivo `.env` configurado com suas credenciais do Supabase (`VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`)

### 🛠️ Passos
```bash
git clone https://github.com/seuusuario/whatsup.git
cd whatsup
npm install
cp .env.example .env
# Preencha o .env com suas credenciais do Supabase
npm run dev
# Acesse no navegador: http://localhost:5173


## 📁 Estrutura do Projeto

```bash
📦 Projeto-Whatsapp-DW2
├── 📁 api
│   ├── index.js               (handler principal das rotas serverless)
│   └── transcribe.js          (rota simulada para transcrição de áudio)
│
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 Button          (botões reutilizáveis da interface)
│   │   ├── 📁 Contacts        (componentes da lista e formulário de contatos)
│   │   ├── 📁 Input           (componentes de campo de entrada)
│   │   ├── 📁 LinkGenerator   (gerador de link direto para WhatsApp)
│   │   ├── 📁 UI              (componentes visuais e estilizados)
│   │   └── 📁 VoiceChat       (lógica e interface do reconhecimento de voz)
│   │
│   ├── App.css                (estilos globais)
│   ├── App.jsx                (estrutura principal da aplicação)
│   ├── main.jsx               (ponto de entrada do React)
│   └── supabaseClient.js      (configuração do Supabase)
│
├── .env                       (variáveis de ambiente — ignorado no Git)
├── .gitignore                 (arquivos/pastas ignoradas)
├── .vercel/                   (configurações do deploy na Vercel)
├── eslint.config.js           (configuração do ESLint)
├── index.html                 (arquivo base da aplicação)
├── package.json               (dependências e scripts)
├── package-lock.json          (controle de versões das dependências)
├── server.js                  (servidor local opcional com Express)
└── README.md
