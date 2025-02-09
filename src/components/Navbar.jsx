import React from 'react';

export const Navbar = ({setCategory}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark"> 
      <div className="container-fluid">
        <a className="navbar-brand" href="#"><span className="badge bg-light text-dark fs-4">Insight News</span></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link" onClick={()=>setCategory("technology")} style={{ cursor: "pointer" }}>Technology</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>setCategory("Business")} style={{ cursor: "pointer" }} >Business</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>setCategory("Health")} style={{ cursor: "pointer" }} >Health</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>setCategory("Science")} style={{ cursor: "pointer" }} >Science</div>
            </li>
            <li className="nav-item">
              <div className="nav-link" onClick={()=>setCategory("Sports")} style={{ cursor: "pointer" }} >Sports</div>
            </li>
           </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
