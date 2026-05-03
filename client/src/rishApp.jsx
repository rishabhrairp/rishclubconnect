import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MemberRegister from './components/MemberRegister';
import ResourceCatalog from './components/ResourceCatalog';
import RSVPOptions from './components/RSVPOptions';
import MemberHistory from './components/MemberHistory';
import AdminApproval from './components/AdminApproval';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<MemberRegister />} />
          <Route path="/catalog" element={<ResourceCatalog />} />
          <Route path="/rsvp" element={<RSVPOptions />} />
          <Route path="/rsvp/:id" element={<RSVPOptions />} />
          <Route path="/history" element={<MemberHistory />} />
          <Route path="/admin" element={<AdminApproval />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;