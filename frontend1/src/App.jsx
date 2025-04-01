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
import ExtendedBlog from "./Components/ExtendedBlog";

const App = () => {
  return (
    <BlogContextProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/writer" element={<CreateBlog />} />
              <Route path="/ownerpage" element={<ProfilePage />} />
              <Route path="editPage/:id" element={<EditPage />} />
              <Route path="/blog/:id" element={<ExtendedBlog />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </BlogContextProvider>
  );
};

export default App;
