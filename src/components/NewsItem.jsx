import image from '../assets/news.jpg'

const NewsItem = ({title, description, src, url}) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "345px" }}>
      <img 
        src={src || image} 
        style={{height: "200px", width: "360px", objectFit: "cover"}} 
        className="card-img-top" 
        alt={title || "News image"} 
      />
      <div className="card-body">
        <h5 className="card-title">{title?.slice(0, 50) || "No title available"}</h5>
        <p className="card-text">
          {description ? description.slice(0, 90) + "..." : "No description available"}
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
