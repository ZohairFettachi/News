import { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=2ff03e4027004e5a84c6c5c81f179259`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.articles) {
          console.error("No articles found!", data);
          setArticles([]); // Prevents .map() errors
        } else {
          setArticles(data.articles);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, [category]);

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
