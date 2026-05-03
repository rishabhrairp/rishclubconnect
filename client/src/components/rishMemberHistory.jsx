import React, { useState, useEffect } from 'react';

const MemberHistory = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions', err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const getBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
      case 'approved': return 'bg-success';
      case 'declined': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div>
      <h2 className="mb-4">Submission History</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Event ID</th>
              <th>Participation</th>
              <th>Timestamp</th>
              <th>Status</th>
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
                  <span className={`badge ${getBadgeClass(sub.status)}`}>
                    {sub.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">No submissions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MemberHistory;
