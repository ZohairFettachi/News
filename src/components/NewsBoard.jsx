import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsItem from './NewsItem';

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let url = `/api/news?category=${category}`; // Calls your backend

    axios.get(url)
      .then(response => {
        if (!response.data.articles) {
          console.error("No articles found!", response.data);
          setArticles([]); // Prevents .map() errors
        } else {
          setArticles(response.data.articles);
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
