import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation();

  const navLink = (to, label) => (
    <li className="nav-item">
      <Link className={`nav-link${pathname === to ? ' active fw-semibold' : ''}`} to={to}>
        {label}
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">Rish Nexus</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navLink('/', 'Home')}
            {navLink('/register', 'Register')}
            {navLink('/catalog', 'Event Catalog')}
            {navLink('/history', 'Submission History')}
            <li className="nav-item">
              <Link
                className={`nav-link text-warning fw-bold${pathname === '/admin' ? ' active' : ''}`}
                to="/admin"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
