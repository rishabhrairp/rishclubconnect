import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResourceCatalog = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/resources')
      .then(res => res.json())
      .then(data => setResources(data))
      .catch(err => console.error(err));
  }, []);

  const filteredResources = resources.filter(res => 
    res.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4">Resource Catalog</h2>
      <input 
        type="text" 
        className="form-control mb-4" 
        placeholder="Search events by title or category..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredResources.map(res => (
          <div className="col-md-4 mb-4" key={res.eventID}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{res.eventTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{res.category}</h6>
                <p className="card-text">
                  <strong>Duration:</strong> {res.duration} <br/>
                  <strong>Fee:</strong> ${res.fee}
                </p>
                <Link to={`/rsvp/${res.eventID}`} className="btn btn-outline-primary w-100">RSVP Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceCatalog;
