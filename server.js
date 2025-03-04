const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// Debug line
console.log('Starting server...');
console.log('API Key status:', process.env.NEWSAPI_KEY ? 'Present' : 'Missing');

const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

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

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the dist directory
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // For any other route, send the index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Catch-all route for any unhandled routes
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: 'Endpoint not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test API available at: http://localhost:${PORT}/api/test`);
    console.log(`News API available at: http://localhost:${PORT}/api/news`);
  });
}

// Export the Express API for Vercel
module.exports = app;
