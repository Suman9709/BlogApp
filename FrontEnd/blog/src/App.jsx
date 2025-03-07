import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import Writer from './Components/Writer';
import OwnerPage from './Components/OwnerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/writer" element={<Writer />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
