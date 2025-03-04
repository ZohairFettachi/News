const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Debug line
console.log('Starting server...');
console.log('API Key status:', process.env.NEWSAPI_KEY ? 'Present' : 'Missing');

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// News route
app.get('/api/news', async (req, res) => {
  const { category } = req.query;
  
  console.log('Received request for category:', category);
  console.log('Using API Key:', process.env.NEWSAPI_KEY ? 'Present' : 'Missing');

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category || 'general',
        apiKey: process.env.NEWSAPI_KEY,
      }
    });

    console.log('API Response status:', response.status);
    
    if (!response.data || !response.data.articles) {
      console.error('Invalid API response:', response.data);
      return res.status(500).json({ error: 'Invalid response from news API' });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response?.data);
    
    if (error.response) {
      return res.status(error.response.status).json({ 
        error: 'News API error', 
        details: error.response.data 
      });
    }
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
