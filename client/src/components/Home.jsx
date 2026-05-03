import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div
        className="p-5 mb-4 rounded-3 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #0d6efd, #0dcaf0)' }}
      >
        <div className="container-fluid py-4">
          <h1 className="display-5 fw-bold">Welcome to Rish Nexus</h1>
          <p className="col-md-8 mx-auto fs-5 mb-4">
            Your one-stop platform for student club management, event RSVPs, and resource tracking.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/register" className="btn btn-light btn-lg px-4 fw-semibold">
              Register Enrollment
            </Link>
            <Link to="/catalog" className="btn btn-outline-light btn-lg px-4">
              Browse Event Catalog
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-3">📋</div>
              <h5 className="card-title">Register</h5>
              <p className="card-text text-muted">Enroll as a club member and join the community.</p>
              <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-3">🗓️</div>
              <h5 className="card-title">Event Catalog</h5>
              <p className="card-text text-muted">Browse upcoming events and RSVP with one click.</p>
              <Link to="/catalog" className="btn btn-primary btn-sm">View Events</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-3">📊</div>
              <h5 className="card-title">Submission History</h5>
              <p className="card-text text-muted">Track the status of all your event submissions.</p>
              <Link to="/history" className="btn btn-primary btn-sm">View History</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
