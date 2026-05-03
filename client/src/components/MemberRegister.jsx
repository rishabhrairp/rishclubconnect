import React, { useState } from 'react';

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    memberName: '',
    email: '',
    yearGrade: '',
    affiliation: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { memberName, email, yearGrade, affiliation } = formData;
    if (!memberName || !email || !yearGrade || !affiliation) {
      setMessage({ text: 'All fields are required.', type: 'danger' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setMessage({ text: 'Enrollment registered successfully!', type: 'success' });
        setFormData({ memberName: '', email: '', yearGrade: '', affiliation: '' });
      } else {
        const err = await res.json();
        setMessage({ text: err.message || 'Registration failed.', type: 'danger' });
      }
    } catch {
      setMessage({ text: 'Server error. Is the backend running?', type: 'danger' });
    }
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: '580px' }}>
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Enrollment Registration</h4>
      </div>
      <div className="card-body">
        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name *</label>
            <input
              type="text"
              className="form-control"
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="Enter your full name"
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Year / Grade Level *</label>
            <input
              type="text"
              className="form-control"
              name="yearGrade"
              value={formData.yearGrade}
              onChange={handleChange}
              placeholder="e.g. 2nd Year, Grade 11"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Organization / Affiliation *</label>
            <input
              type="text"
              className="form-control"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              placeholder="e.g. CS Department, Tech Club"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default MemberRegister;
