const memberForm = document.getElementById("memberForm");
const memberTableBody = document.getElementById("memberTableBody");
const messageBox = document.getElementById("messageBox");
const clearBtn = document.getElementById("clearBtn");

const getMembers = () => {
  let enrollments = localStorage.getItem("clubMembers");
  return enrollments ? JSON.parse(enrollments) : [];
}
const addTestData = () => {
    const testData = [
        {
            name: "Workshop Night",
            email: "test1@gmail.com",
            year: "2 hours",
            affiliation: "Workshop",
            phone: "Free"
        },
        {
            name: "Club Meeting",
            email: "test2@gmail.com",
            year: "1 hour",
            affiliation: "Social Event",
            phone: "Enrollments Only"
        }
    ];

    let table = document.getElementById("memberTableBody");
    table.innerHTML = "";

    testData.forEach((enrollment, index) => {
        let row = `
            <tr>
                <td>${enrollment.name}</td>
                <td>${enrollment.email}</td>
                <td>${enrollment.year}</td>
                <td>${enrollment.affiliation}</td>
                <td>${enrollment.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm">Update</button>
                    <button class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}
const saveMembers = (enrollments) => {
  localStorage.setItem("clubMembers", JSON.stringify(enrollments));
}

const showMessage = (type, text) => {
  messageBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${text}
    </div>
  `;
}

const clearMessage = () => {
  messageBox.innerHTML = "";
}

const renderMembers = () => {
  const enrollments = getMembers();
  memberTableBody.innerHTML = "";

  if (enrollments.length === 0) {
    memberTableBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">No enrollments added yet.</td>
      </tr>
    `;
    return;
  }

  for (let i = 0; i < enrollments.length; i++) {
    const enrollment = enrollments[i];

    memberTableBody.innerHTML += `
      <tr>
        <td>${enrollment.memberName}</td>
        <td>${enrollment.email}</td>
        <td>${enrollment.year}</td>
        <td>${enrollment.affiliation}</td>
        <td>${enrollment.phone}</td>
        <td>
          <button class="btn btn-sm btn-warning me-1" onclick="editMember(${i})">Update</button>
          <button class="btn btn-sm btn-danger" onclick="deleteMember(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
}

const editMember = (index) => {
  const enrollments = getMembers();
  const enrollment = enrollments[index];

  document.getElementById("memberName").value = enrollment.memberName;
  document.getElementById("email").value = enrollment.email;
  document.getElementById("year").value = enrollment.year;
  document.getElementById("affiliation").value = enrollment.affiliation;
  document.getElementById("phone").value = enrollment.phone;
  document.getElementById("editIndex").value = index;

  showMessage("info", "You are now editing a enrollment.");
}

const deleteMember = (index) => {
  let enrollments = getMembers();
  enrollments.splice(index, 1);
  saveMembers(enrollments);
  renderMembers();
  showMessage("success", "Enrollment deleted successfully.");
}

memberForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessage();

  const memberName = document.getElementById("memberName").value.trim();
  const email = document.getElementById("email").value.trim();
  const year = document.getElementById("year").value.trim();
  const affiliation = document.getElementById("affiliation").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (
    memberName === "" ||
    email === "" ||
    year === "" ||
    affiliation === ""
  ) {
    showMessage("danger", "Please fill in all required fields.");
    return;
  }

  const memberData = {
    memberName: memberName,
    email: email,
    year: year,
    affiliation: affiliation,
    phone: phone
  };

  let enrollments = getMembers();

  if (editIndex === "-1") {
    enrollments.push(memberData);
    showMessage("success", "Enrollment added successfully.");
  } else {
    enrollments[editIndex] = memberData;
    showMessage("success", "Enrollment updated successfully.");
    document.getElementById("editIndex").value = "-1";
  }

  saveMembers(enrollments);
  renderMembers();
  memberForm.reset();
});

clearBtn.addEventListener("click", function () {
  document.getElementById("editIndex").value = "-1";
  clearMessage();
});
fetch("data/enrollments.json")
  .then(res => res.json())
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log("Fetch request failed");
  });
renderMembers();