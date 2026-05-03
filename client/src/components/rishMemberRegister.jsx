import React, { useState } from 'react';

const MemberRegister = () => {
  const [formData, setFormData] = useState({
    memberName: '',
    email: '',
    yearGrade: '',
    affiliation: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.memberName || !formData.email || !formData.yearGrade || !formData.affiliation) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage('Enrollment registered successfully!');
        setFormData({ memberName: '', email: '', yearGrade: '', affiliation: '' });
      } else {
        setMessage('Error registering enrollment.');
      }
    } catch (error) {
      setMessage('Server error.');
    }
  };

  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-header bg-primary text-white">
        <h4 className="mb-0">Enrollment Registration</h4>
      </div>
      <div className="card-body">
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enrollment Name *</label>
            <input type="text" className="form-control" name="memberName" value={formData.memberName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Year/Grade *</label>
            <input type="text" className="form-control" name="yearGrade" value={formData.yearGrade} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Affiliation *</label>
            <input type="text" className="form-control" name="affiliation" value={formData.affiliation} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

export default MemberRegister;
