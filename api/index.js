const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/news', async (req, res) => {
  const { category } = req.query;
  
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category || 'general',
        apiKey: process.env.NEWSAPI_KEY,
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      details: error.response?.data || error.message 
    });
  }
});

// This is important for Vercel
module.exports = app; 