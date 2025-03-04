import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `/api/news?category=${category}`;
      console.log('Fetching from URL:', url);
      
      setLoading(true);
      setError(null);

      try {
        // Add a timeout to the request to prevent hanging
        const response = await axios.get(url, { 
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.data || !response.data.articles) {
          console.error('Invalid response data:', response.data);
          setError("No articles found in response");
          setArticles([]);
        } else {
          console.log(`Received ${response.data.articles.length} articles`);
          setArticles(response.data.articles);
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response status:', err.response.status);
          console.error('Error response data:', err.response.data);
          setError(`Error ${err.response.status}: ${err.response.data?.error || 'Failed to fetch news'}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received');
          setError("No response from server. Please check if the server is running.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
          setError(`Request error: ${err.message}`);
        }
        
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <div className="spinner-text">Loading News</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{error}</p>
      <p className="error-help">Please try again later or check the console for more details.</p>
    </div>
  );

  return (
    <div className="news-container">
      <header className="news-header">
        <h1 className="news-main-title">
          Today's <span className="highlight">Headlines</span>
        </h1>
        <div className="category-badge">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      </header>
      
      {articles.length > 0 ? (
        <>
          {/* Featured Article (first article) */}
          {articles.length > 0 && (
            <div className="featured-article">
              <NewsItem
                title={articles[0].title}
                description={articles[0].description}
                src={articles[0].urlToImage}
                url={articles[0].url}
              />
            </div>
          )}
          
          {/* Regular Articles Grid */}
          <div className="news-grid">
            {articles.slice(1).map((news, index) => (
              <NewsItem
                key={index + 1}
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📰</div>
          <h3 className="empty-title">No news available</h3>
          <p className="empty-message">There are no articles available for the "{category}" category at this time.</p>
          <p className="empty-help">Please try selecting a different category.</p>
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
