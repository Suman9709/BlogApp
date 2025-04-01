import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import BlogContextProvider from "./Context/BlogContextProvider";
import CreateBlog from "./Components/CreateBlog";
import ProfilePage from "./Components/ProfilePage";
import EditPage from "./Components/EditPage";
import Footer from "./Components/Footer";

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
          <Route path="/ownerpage" element={<ProfilePage />} />
          <Route path="editPage/:id" element={<EditPage/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </BlogContextProvider>
  );
};

export default App;
