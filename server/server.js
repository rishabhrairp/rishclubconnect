const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:8080",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

const dataDir = path.join(__dirname, "data");

const readJSON = (filename) => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeJSON = (filename, data) => {
  fs.writeFileSync(
    path.join(dataDir, filename),
    JSON.stringify(data, null, 2),
    "utf8"
  );
};

// GET /api/resources
app.get("/api/resources", (_req, res) => {
  try {
    res.json(readJSON("resources.json"));
  } catch (err) {
    res.status(500).json({ message: "Error reading resources" });
  }
});

// GET /api/members
app.get("/api/members", (_req, res) => {
  try {
    res.json(readJSON("members.json"));
  } catch (err) {
    res.status(500).json({ message: "Error reading members" });
  }
});

// POST /api/members
app.post("/api/members", (req, res) => {
  try {
    const { memberName, email, yearGrade, affiliation } = req.body;
    if (!memberName || !email || !yearGrade || !affiliation) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const members = readJSON("members.json");
    const newMember = {
      memberID: Date.now().toString(),
      memberName,
      email,
      yearGrade,
      affiliation,
      status: "pending",
      timestamp: new Date().toISOString()
    };
    members.push(newMember);
    writeJSON("members.json", members);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: "Error saving member" });
  }
});

// PUT /api/members/:id
app.put("/api/members/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "declined", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const members = readJSON("members.json");
    const index = members.findIndex((m) => m.memberID === id);
    if (index === -1) {
      return res.status(404).json({ message: "Member not found" });
    }
    members[index].status = status;
    writeJSON("members.json", members);
    res.json(members[index]);
  } catch (err) {
    res.status(500).json({ message: "Error updating member" });
  }
});

// GET /api/submissions
app.get("/api/submissions", (_req, res) => {
  try {
    res.json(readJSON("submissions.json"));
  } catch (err) {
    res.status(500).json({ message: "Error reading submissions" });
  }
});

// POST /api/submissions
app.post("/api/submissions", (req, res) => {
  try {
    const { memberName, email, participationType, eventID } = req.body;
    if (!memberName || !email || !participationType || !eventID) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const submissions = readJSON("submissions.json");
    const newSubmission = {
      submissionID: Date.now().toString(),
      memberName,
      email,
      participationType,
      eventID,
      status: "pending",
      timestamp: new Date().toISOString()
    };
    submissions.push(newSubmission);
    writeJSON("submissions.json", submissions);
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(500).json({ message: "Error saving submission" });
  }
});

// PUT /api/submissions/:id
app.put("/api/submissions/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["approved", "declined", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const submissions = readJSON("submissions.json");
    const index = submissions.findIndex((s) => s.submissionID === id);
    if (index === -1) {
      return res.status(404).json({ message: "Submission not found" });
    }
    submissions[index].status = status;
    writeJSON("submissions.json", submissions);
    res.json(submissions[index]);
  } catch (err) {
    res.status(500).json({ message: "Error updating submission" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
