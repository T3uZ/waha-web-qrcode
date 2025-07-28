# Sistema de Exibição Segura de QR Code WhatsApp

Sistema backend + frontend simples para exibir o QR Code de autenticação WhatsApp usando a API da iCore, com proteção por token e reinicialização automática da sessão ao detectar erros específicos.

---

## Funcionalidades

- Consulta o QR Code via API protegida por token  
- Atualização automática do QR Code a cada 20 segundos (até 4 tentativas)  
- Reinicia a sessão automaticamente ao receber erro 422 da API  
- Frontend simples e responsivo com instruções para leitura do QR Code  
- Proteção da chave API e token via variáveis de ambiente (.env)  
- Servidor Express para servir API e frontend estático  

---

## Tecnologias usadas

- Node.js + Express  
- Axios para requisições HTTP  
- Tailwind CSS para estilização do frontend  
- Dotenv para variáveis de ambiente  

---

## Instalação

1. Clone o repositório:  
   ```bash
   git clone https://github.com/T3uZ/waha-web-qrcode.git
   cd waha-web-qrcode

## Instale as dependências:
```bash
npm install



## Crie um arquivo .env baseado no .env.example:
```bash
    API_KEY=suachaveapikey
    ACCESS_TOKEN=seutokenseguro
    PORT=3001

    
## Inicie o servidor:
```bash
    npm start


## USO:

```bash
    http://localhost:3001/qr.html?projeto=SESSAO&token=seutokenseguro


