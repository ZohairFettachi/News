import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = `/api/news?category=${category}`;
    console.log('Fetching from URL:', url);
    
    setLoading(true);
    setError(null);

    axios.get(url)
      .then(response => {
        if (!response.data.articles) {
          setError("No articles found");
          setArticles([]);
        } else {
          setArticles(response.data.articles);
        }
      })
      .catch(err => {
        setError("Failed to fetch news");
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      ) : (
        <p className="text-center">No news available.</p>
      )}
    </div>
  );
};

export default NewsBoard;
