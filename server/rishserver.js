const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "..", "data");

const readFile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(dataDir, filename), "utf8", (err, data) => {
      if (err) return reject(err);
      resolve(JSON.parse(data));
    });
  });
};

const writeFile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(dataDir, filename), JSON.stringify(data, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// GET /api/resources
app.get("/api/resources", async (req, res) => {
  try {
    const resources = await readFile("resources.json");
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: "Error reading resources" });
  }
});

// POST /api/enrollments
app.post("/api/enrollments", async (req, res) => {
  try {
    const { memberName, email, yearGrade, affiliation } = req.body;
    if (!memberName || !email || !yearGrade || !affiliation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const enrollments = await readFile("enrollments.json");
    const newMember = {
      id: Date.now().toString(),
      memberName,
      email,
      yearGrade,
      affiliation,
      timestamp: new Date().toISOString()
    };
    enrollments.push(newMember);
    await writeFile("enrollments.json", enrollments);
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: "Error saving enrollment" });
  }
});

// GET /api/submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await readFile("submissions.json");
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error reading submissions" });
  }
});

// POST /api/submissions
app.post("/api/submissions", async (req, res) => {
  try {
    const { eventID, participation } = req.body;
    if (!eventID || !participation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const submissions = await readFile("submissions.json");
    const newSubmission = {
      id: Date.now().toString(),
      eventID,
      participation,
      status: "pending",
      timestamp: new Date().toISOString()
    };
    submissions.push(newSubmission);
    await writeFile("submissions.json", submissions);
    res.status(201).json(newSubmission);
  } catch (err) {
    res.status(500).json({ message: "Error saving submission" });
  }
});

// PUT /api/submissions/:id
app.put("/api/submissions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "declined", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const submissions = await readFile("submissions.json");
    const index = submissions.findIndex(s => s.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Submission not found" });
    }

    submissions[index].status = status;
    await writeFile("submissions.json", submissions);
    res.json(submissions[index]);
  } catch (err) {
    res.status(500).json({ message: "Error updating submission" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});