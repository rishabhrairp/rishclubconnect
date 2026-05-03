import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResourceCatalog = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch(() => setError('Failed to load events. Is the server running?'));
  }, []);

  const filtered = resources.filter(
    (r) =>
      r.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Event Catalog</h2>
        <span className="badge bg-secondary">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search by event title or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="row g-4">
        {filtered.map((res) => (
          <div className="col-md-6 col-lg-4" key={res.eventID}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column">
                <span className="badge bg-primary mb-2 align-self-start">{res.category}</span>
                <h5 className="card-title">{res.eventTitle}</h5>
                <p className="card-text text-muted small mb-3">
                  <strong>Duration:</strong> {res.duration}
                  <br />
                  <strong>Fee:</strong> {res.fee === 0 ? 'Free' : `$${res.fee}`}
                </p>
                <Link
                  to={`/rsvp/${res.eventID}`}
                  className="btn btn-outline-primary mt-auto w-100"
                >
                  RSVP Now
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && !error && (
          <div className="col-12 text-center text-muted py-5">No events match your search.</div>
        )}
      </div>
    </div>
  );
};

export default ResourceCatalog;
