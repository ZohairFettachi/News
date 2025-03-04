const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/news', async (req, res) => {
  const { category } = req.query;

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category || 'general',
        apiKey: process.env.NEWSAPI_KEY, // Utilise la clé API depuis .env
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
