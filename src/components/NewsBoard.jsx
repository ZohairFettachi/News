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
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger text-center my-5" role="alert">
      <h4 className="alert-heading">Error!</h4>
      <p>{error}</p>
      <hr />
      <p className="mb-0">Please try again later or check the console for more details.</p>
    </div>
  );

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="text-center mb-4">
            Latest <span className="badge bg-danger">News</span>
          </h2>
          <div className="news-category-tag bg-dark text-white d-inline-block py-1 px-3 rounded-pill mb-4 mx-auto d-block text-center">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        </div>
      </div>
      
      {articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((news, index) => (
            <div 
              className="col-12 col-sm-6 col-md-4 col-lg-3" 
              key={index}
            >
              <NewsItem
                title={news.title}
                description={news.description}
                src={news.urlToImage}
                url={news.url}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info text-center">
              <i className="bi bi-info-circle me-2"></i>
              No news available for this category. Please try a different one.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsBoard;
