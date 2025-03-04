import image from '../assets/news.jpg'

const NewsItem = ({title, description, src, url}) => {
  return (
    <div className="news-card">
      <div className="news-card-inner">
        <div className="news-img-container">
          <img 
            src={src || image} 
            className="news-img"
            alt={title || "News image"} 
            loading="lazy"
          />
          <div className="news-overlay"></div>
        </div>
        <div className="news-content">
          <h3 className="news-title">
            {title?.slice(0, 70) || "No title available"}
            {title?.length > 70 ? "..." : ""}
          </h3>
          <p className="news-excerpt">
            {description ? description.slice(0, 120) + "..." : "No description available"}
          </p>
          <div className="news-footer">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-readmore"
            >
              Read Article <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
