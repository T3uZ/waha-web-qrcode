require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve arquivos HTML/CSS/JS da pasta public
app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;
const PORT = process.env.PORT || 3001;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.get('/qr/:projeto/:token', async (req, res) => {
  const { projeto, token } = req.params;

  if (token !== ACCESS_TOKEN) {
    return res.status(401).send('Não autorizado');
  }

  try {
    const qrResponse = await axios.get(`${API_URL}/api/${projeto}/auth/qr?format=image`, {
      headers: {
        'accept': 'image/png',
        'X-Api-Key': API_KEY,
      },
      responseType: 'arraybuffer',
    });

    res.set('Content-Type', 'image/png');
    return res.send(qrResponse.data);
  } catch (err) {
    const status = err.response?.status;

    if (status === 422) {
      try {
        await axios.post(
          `${API_URL}/api/sessions/${projeto}/restart`,
          '',
          {
            headers: {
              'accept': 'application/json',
              'X-Api-Key': API_KEY,
            }
          }
        );

        return res.status(202).send('Sessão reiniciada após erro 422');
      } catch (restartError) {
        console.error('Erro ao reiniciar a sessão:', restartError.message);
        return res.status(500).send('Erro ao reiniciar a sessão após erro 422');
      }
    }

    console.error('Erro ao buscar QR Code:', err.message);
    return res.status(500).send('Erro ao buscar QR Code');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
