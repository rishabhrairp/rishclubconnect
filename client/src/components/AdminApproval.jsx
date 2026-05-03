import React, { useState, useEffect, useCallback } from 'react';

const AdminApproval = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPending = useCallback(async () => {
    setLoading(true);
    try {
      const [membersRes, submissionsRes] = await Promise.all([
        fetch('http://localhost:5000/api/members'),
        fetch('http://localhost:5000/api/submissions')
      ]);
      const [members, submissions] = await Promise.all([
        membersRes.json(),
        submissionsRes.json()
      ]);

      const pendingMembers = members
        .filter((m) => m.status === 'pending')
        .map((m) => ({ ...m, _type: 'enrollment', _id: m.memberID }));

      const pendingSubmissions = submissions
        .filter((s) => s.status === 'pending')
        .map((s) => ({ ...s, _type: 'rsvp', _id: s.submissionID }));

      setItems([...pendingMembers, ...pendingSubmissions]);
    } catch {
      setError('Failed to load pending items. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const updateStatus = async (item, status) => {
    const endpoint = item._type === 'enrollment'
      ? `http://localhost:5000/api/members/${item._id}`
      : `http://localhost:5000/api/submissions/${item._id}`;

    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchPending();
      } else {
        alert('Failed to update status. Please try again.');
      }
    } catch {
      alert('Server error. Is the backend running?');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger mb-0">Admin Approval Dashboard</h2>
        {!loading && (
          <span className="badge bg-warning text-dark fs-6">
            {items.length} pending
          </span>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p className="text-muted">Loading pending items...</p>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-danger">
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Details</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={`${item._type}-${item._id}`}>
                  <td>
                    <span className={`badge ${item._type === 'enrollment' ? 'bg-primary' : 'bg-info text-dark'}`}>
                      {item._type === 'enrollment' ? 'Enrollment' : 'RSVP'}
                    </span>
                  </td>
                  <td>{item.memberName}</td>
                  <td>{item.email}</td>
                  <td>
                    {item._type === 'enrollment'
                      ? `${item.yearGrade} — ${item.affiliation}`
                      : <><span className="badge bg-secondary me-1">{item.eventID}</span>{item.participationType}</>
                    }
                  </td>
                  <td>{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateStatus(item, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => updateStatus(item, 'declined')}
                      >
                        Decline
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-muted py-4">
                    No pending items — all caught up!
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

export default AdminApproval;
