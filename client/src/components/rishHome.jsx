import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 text-center" style={{ backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Welcome to [Your New Project Name]</h1>
        <p className="col-md-8 mx-auto fs-4">
          Your one-stop platform for student club management and resource portal.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/register" className="btn btn-primary btn-lg px-4">Register Enrollment</Link>
          <Link to="/catalog" className="btn btn-outline-light btn-lg px-4">Event Catalog</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
