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

### Frontend

- React — Biblioteca principal da interface
- CSS Puro — Estilização personalizada
- Material UI (MUI) — Componentes visuais
- react-phone-input-2 — Entrada de telefone com máscara
- react-qr-code — Geração de QR Codes

### Backend e Banco de Dados

- Supabase — Armazenamento e gerenciamento de contatos
- Vercel Serverless Functions — Deploy e pequenas funções de backend

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
# Observação: As Serverless Functions do Vercel são usadas no deploy online; o arquivo server.js permanece apenas para teste local.
