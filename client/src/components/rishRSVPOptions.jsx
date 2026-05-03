import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RSVPOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [participation, setParticipation] = useState('In-person');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      setMessage('Event ID is missing. Please select an event from the catalog.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventID: id, participation })
      });
      
      if (response.ok) {
        setMessage('RSVP submitted successfully! Redirecting to history...');
        setTimeout(() => navigate('/history'), 2000);
      } else {
        setMessage('Error submitting RSVP.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">RSVP / Finalization</h4>
      </div>
      <div className="card-body">
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Event ID</label>
            <input type="text" className="form-control" value={id || ''} readOnly disabled />
          </div>
          <div className="mb-3">
            <label className="form-label">Participation Type</label>
            <select className="form-select" value={participation} onChange={(e) => setParticipation(e.target.value)}>
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={!id}>Confirm RSVP</button>
        </form>
      </div>
    </div>
  );
}

export default RSVPOptions;
