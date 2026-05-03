import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RSVPOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberName: '',
    email: '',
    participationType: 'In-Person'
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setMessage({ text: 'No event selected. Please choose an event from the catalog.', type: 'warning' });
      return;
    }
    if (!formData.memberName.trim() || !formData.email.trim()) {
      setMessage({ text: 'Full name and email are required.', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberName: formData.memberName.trim(),
          email: formData.email.trim(),
          participationType: formData.participationType,
          eventID: id
        })
      });

      if (res.ok) {
        setMessage({ text: 'RSVP submitted successfully! Redirecting to history...', type: 'success' });
        setTimeout(() => navigate('/history'), 2000);
      } else {
        const err = await res.json();
        setMessage({ text: err.message || 'Submission failed.', type: 'danger' });
      }
    } catch {
      setMessage({ text: 'Server error. Is the backend running on port 5000?', type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: '520px' }}>
      <div className="card-header bg-success text-white">
        <h4 className="mb-0">RSVP / Event Registration</h4>
      </div>
      <div className="card-body">
        {!id && (
          <div className="alert alert-warning">
            No event selected.{' '}
            <Link to="/catalog" className="alert-link">Browse the Event Catalog</Link> to pick an event.
          </div>
        )}

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Event ID</label>
            <input
              type="text"
              className="form-control bg-light"
              value={id || '— none selected —'}
              readOnly
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name *</label>
            <input
              type="text"
              className="form-control"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email *</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Participation Type *</label>
            <select
              className="form-select"
              name="participationType"
              value={formData.participationType}
              onChange={handleChange}
            >
              <option value="In-Person">In-Person</option>
              <option value="Virtual">Virtual</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={!id || submitting}
          >
            {submitting ? 'Submitting...' : 'Confirm RSVP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVPOptions;
