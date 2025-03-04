import image from '../assets/news.jpg'

const NewsItem = ({title, description, src, url}) => {
  return (
    <div className="card h-100 bg-dark text-light shadow-sm border-0">
      <div className="card-img-container position-relative overflow-hidden" style={{ height: "200px" }}>
        <img 
          src={src || image} 
          className="card-img-top w-100 h-100"
          style={{ objectFit: "cover" }} 
          alt={title || "News image"} 
          loading="lazy"
        />
        <div className="gradient-overlay position-absolute bottom-0 w-100" style={{ 
          height: "50%", 
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" 
        }}></div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: "1.1rem", lineHeight: "1.4" }}>
          {title?.slice(0, 70) || "No title available"}
          {title?.length > 70 ? "..." : ""}
        </h5>
        <p className="card-text flex-grow-1" style={{ fontSize: "0.9rem", color: "#d1d1d1" }}>
          {description ? description.slice(0, 120) + "..." : "No description available"}
        </p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary btn-sm mt-auto"
          style={{ backgroundColor: "#1a73e8", borderColor: "#1a73e8" }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
