import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import BlogContextProvider from "./Context/BlogContextProvider";
import CreateBlog from "./Components/CreateBlog";

const App = () => {
  return (
    <BlogContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/writer" element={<CreateBlog />} />
          
        </Routes>
      </BrowserRouter>
    </BlogContextProvider>
  );
};

export default App;
