# Rish Nexus — Student Club Portal

A full-stack student club management system built with React (Vite) and Node.js (Express), using JSON files for data persistence.

---

## Project Structure

club-connect/
├── client/          # React frontend (Vite)
├── server/          # Express backend
│   └── data/        # JSON data files (members, submissions, resources)



## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

---

## Setup & Running

### 1. Start the Backend

```bash
cd server
npm install
node server.js
Server runs at http://localhost:5000

2. Start the Frontend
Open a second terminal:


cd client
npm install
npm run dev
App runs at http://localhost:5173

Pages
Route	Description
/	Home
/register	Enrollment Registration
/catalog	Event Catalog
/rsvp/:eventID	RSVP for an event
/history	View all submission statuses
/admin	Approve or decline enrollments and RSVPs
Workflow
Go to Register → submit your details
Go to Event Catalog → click RSVP Now on an event
Fill in your name, email, and participation type → Confirm RSVP
Go to Admin → approve or decline any pending item
Go to Submission History → check status badges (Pending / Approved / Declined)
API Endpoints
Method	Endpoint	Description
GET	/api/resources	Get all events
POST	/api/members	Register a new member
GET	/api/members	Get all members
PUT	/api/members/:id	Update member status
GET	/api/submissions	Get all RSVPs
POST	/api/submissions	Submit an RSVP
PUT	/api/submissions/:id	Update RSVP status

