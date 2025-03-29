import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LoginPage from './Components/LoginPage';
import SignUpPage from './Components/SignUpPage';
import Writer from './Components/Writer';
import OwnerPage from './Components/OwnerPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import EditPage from './Components/EditPage';

const App = () => {
  return (
   
    <Router>
      <Navbar/>
      <Routes>
     
       <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/writer" element={<Writer />} />
        <Route path="/ownerpage" element={<OwnerPage />} />
        <Route path="/editPage" element={<EditPage />} />
      
      </Routes>
      <Footer/>
    </Router>
 
  );
};

export default App;
