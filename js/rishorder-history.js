const orderTableBody = document.getElementById("orderTableBody");

fetch("http://localhost:5000/api/submissions")
  .then(response => response.json())
  .then(data => {
    orderTableBody.innerHTML = "";

    data.forEach(transaction => {
      let badgeClass = "bg-warning";

      if (transaction.status === "approved") {
        badgeClass = "bg-success";
      } else if (transaction.status === "declined") {
        badgeClass = "bg-danger";
      }

      orderTableBody.innerHTML += `
        <tr>
          <td>${transaction.id}</td>
          <td>${transaction.name}</td>
          <td>${transaction.email}</td>
          <td>${transaction.participation}</td>
          <td><span class="badge ${badgeClass}">${transaction.status}</span></td>
        </tr>
      `;
    });
  })
  .catch(error => {
    console.error("Failed to load submission history:", error);
  });