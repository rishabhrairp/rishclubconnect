import { useState, useEffect } from "react";

const App = () => {
  const [transactions, setOrders] = useState([]);

  // fetch data from backend
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  // update status
  const updateStatus = (id, status) => {
    fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    }).then(() => {
      setOrders(prev =>
        prev.map(transaction =>
          transaction.id === id ? { ...transaction, status } : transaction
        )
      );
    });
  };

  return (
    <div>
      <h1>Approval Page (React)</h1>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Participation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.email}</td>
              <td>{transaction.participation}</td>
              <td>
                <button onClick={() => updateStatus(transaction.id, "approved")}>
                  Approve
                </button>

                <button onClick={() => updateStatus(transaction.id, "declined")}>
                  Decline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;