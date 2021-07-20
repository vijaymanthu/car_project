import React from "react"
import { Link } from "react-router-dom"
export default function Header(){
      
    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Car Project</a>
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">User Login</Link>
        </li>
        <li className="nav-item"> <Link to="/alogin" className="float-end nav-link">Admin Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
</div>
    )
}