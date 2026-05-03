import React, { useState, useEffect } from 'react';

const AdminApproval = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions');
      const data = await response.json();
      // Filter for pending status
      setSubmissions(data.filter(s => s.status === 'pending'));
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        // Refresh the list dynamically
        fetchSubmissions();
      } else {
        alert('Failed to update status.');
      }
    } catch (error) {
      alert('Server error.');
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-danger">Admin Approval Dashboard</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Event ID</th>
              <th>Participation</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(sub => (
              <tr key={sub.id}>
                <td>{sub.id}</td>
                <td>{sub.eventID}</td>
                <td>{sub.participation}</td>
                <td>{new Date(sub.timestamp).toLocaleString()}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => handleUpdateStatus(sub.id, 'approved')}
                    >Approve</button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleUpdateStatus(sub.id, 'declined')}
                    >Decline</button>
                  </div>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No pending submissions.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApproval;
