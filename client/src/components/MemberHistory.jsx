import React, { useState, useEffect } from 'react';

const badgeClass = (status) => {
  if (status === 'approved') return 'bg-success';
  if (status === 'declined') return 'bg-danger';
  return 'bg-warning text-dark';
};

const MemberHistory = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/submissions')
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load submissions. Is the server running?');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4">Submission History</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-muted">Loading submissions...</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>Submission ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Event ID</th>
                <th>Participation</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.submissionID}>
                  <td><code className="text-muted">{sub.submissionID}</code></td>
                  <td>{sub.memberName}</td>
                  <td>{sub.email}</td>
                  <td><span className="badge bg-secondary">{sub.eventID}</span></td>
                  <td>{sub.participationType}</td>
                  <td>{new Date(sub.timestamp).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${badgeClass(sub.status)}`}>
                      {sub.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-4">
                    No submissions yet. RSVP to an event to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberHistory;
