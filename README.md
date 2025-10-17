# <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="24" style="vertical-align: middle; margin-right: 8px;" /> WhatsUp!

Aplicação web desenvolvida como projeto da disciplina _**Desenvolvimento Web II (DW2)**_. O _**WhatsUp!**_ facilita a criação de links e QR Codes para o WhatsApp, armazena e gerencia contatos.

## 🧑‍💻 Autoras
<div style="display: flex; justify-content: space-evenly; align-items: center; gap: 10px;">
  <div style="text-align: center;">
  
  <div style="text-align: center;">
    <p><strong>Isabely Turquino</strong></p>
    <a href="mailto:isabelyturquino@alunos.utfpr.edu.br">
      <img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" alt="Isabely Turquino Gmail">
    </a>
    <a href="https://wa.me/554499755563" target="_blank">
      <img src="https://img.shields.io/badge/-WhatsApp-%234CBB87?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Isabely Turquino WhatsApp">
    </a>
  </div>

  <p><strong>Yasmym Lemes</strong></p>
    <a href="mailto:ylemes@alunos.utfpr.edu.br">
      <img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" alt="Yasmym Lemes Gmail">
    </a>
    <a href="https://wa.me/5541996386250" target="_blank">
      <img src="https://img.shields.io/badge/-WhatsApp-%234CBB87?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Yasmym Lemes WhatsApp">
    </a>
  </div>

</div>

## 🚀 Acesse o Projeto
🔗 [https://projeto-whatsapp-dw2.vercel.app/](https://projeto-whatsapp-dw2.vercel.app/)

## 🧭 Visão Geral

O _**WhatsUp!**_ é desenvolvido com _**React JS**_, _**CSS puro**_ e _**Material UI**_, integrado com _**Supabase**_ para gerenciamento de contatos e _**Vercel**_ para deploy com serverless functions.  
A aplicação conta com uma _**página inicial simples**_, contendo um botão _**“Começar”**_ que leva o usuário para a interface principal do sistema.  
O sistema possui duas áreas principais: _**Gerador de Links**_ e _**Agenda de Contatos**_, oferecendo _**praticidade, interatividade e eficiência**_ ao usuário.

<p align="center">
  <img src="https://i.imgur.com/AlRuzU3.png" alt="Mockup da Interface WhatsUp!" width="800">
</p>

<p align="center"><em>Interface responsiva do WhatsUp! exibida em tablet, laptop e smartphone.</em></p>

## 🧩 Funcionalidades Principais

### 🏠 Página Inicial
- Página de boas-vindas simples com botão _**“Começar”**_  
- Direciona o usuário para a aplicação principal

### 📱 Gerador de Links do WhatsApp
- Entrada de número de telefone com _**formatação automática**_  
- Campo para _**mensagem personalizada**_  
- Geração automática de links no formato `wa.me`  
- Opções para _**copiar o link, gerar QR Code ou abrir diretamente no WhatsApp**_

### 📂 Agenda de Contatos
- Operações de _**CRUD completas**_ com integração ao Supabase  
- Botão para integração com o Gerador de Links  
- _**Pesquisa rápida**_ para localizar contatos pelo nome ou número  
- Cada contato contém: `id`, `created_at`, `name` e `number`

## 💡 Funcionalidades Extras

### 🎙️ Transcrição de Áudio para Mensagens
- O usuário pode _**gravar sua voz diretamente na aplicação**_  
- A gravação é _**convertida automaticamente em texto**_ e preenchida no campo de mensagem  
- Facilita o envio de mensagens _**sem digitação**_, tornando a aplicação mais _**prática e acessível**_

### 🖼️ Geração Automática de QR Code
- Cada link criado gera um _**QR Code correspondente**_ usando `react-qr-code`  
- Permite _**compartilhar ou abrir a conversa em outro dispositivo**_ apenas escaneando o código

### 🌗 Modo Claro e Escuro 
- _**Alternância rápida entre temas**_ claro e escuro para melhor experiência visual  

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

### 🧑‍🎨 Frontend
- _**React**_ — Biblioteca principal da interface  
- _**CSS Puro**_ — Estilização personalizada  
- _**Material UI (MUI)**_ — Componentes visuais  
- react-phone-input-2 — Entrada de telefone com máscara  
- react-qr-code — Geração de QR Codes  
- react-router-dom — Navegação entre páginas  
- Web Speech API — Transcrição de voz para texto  
- Lucide-react — Ícones modernos

### 🧑‍💻 Backend e Banco de Dados
- _**Supabase**_ — Armazenamento e gerenciamento de contatos  
- _**Vercel Serverless Functions**_ — Deploy e pequenas funções de backend  
- _**Node.js**_ — Ambiente de execução JavaScript  
- Express — Servidor e middlewares  
- dotenv — Gerenciamento de variáveis de ambiente

## ⚡ Como Rodar Localmente

### 🧩 Pré-requisitos
- _**Node.js instalado**_  
- _**Conta no Supabase**_  
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


