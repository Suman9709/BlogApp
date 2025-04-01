import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../Components/ImgAssets/logo1.png";
import { Button } from "@mui/material";
import AllButton from "./AllButton";
import BlogContext from "../Context/Blogcontext";

const Navbar = () => {
  const { logout, isAuthenticated, user } = useContext(BlogContext)
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
        setIsDropdownOpen(false);
    } else {
        console.error("Logout failed", response.message);
    }
};

  


  return (
    <nav className="bg-white shadow-md fixed z-10 top-0 w-full">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <div className="flex items-center border border-gray-400 rounded-4xl p-2 bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <input type="text" placeholder="What are you looking for..." className="outline-none px-2 w-full" />
          <SearchIcon className="text-gray-500 cursor-pointer" />
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <ul className="flex gap-6">
            <li className="relative group">
              <Link to="/" className="hover:text-blue-600">Blog</Link>
            </li>
            <li className="relative group">
              <Link to="/Category" className="hover:text-blue-600">Category</Link>
            </li>
            <li className="relative group">
              <Link to={isAuthenticated ? "/writer" : "/ContactUs"} className="hover:text-blue-600">
                {isAuthenticated ? "Create Blog" : "Contact Us"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Authentication & Profile */}
        <div className="flex items-center gap-4 relative">
          {!isOpen && (
            isAuthenticated ? (
              <>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold cursor-pointer">
                  <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </Button>
                </div>

                {/* User Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md">
                    <ul className="flex flex-col">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/ownerpage")}>
                        My Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <AllButton variant="outlined" name="Login" onClick={() => navigate("/login")} />
                <AllButton variant="contained" name="Signup" onClick={() => navigate("/signup")} />
              </>
            )
          )}

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile View Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-center">
            <li><Link to="/" className="hover:text-blue-600">Blog</Link></li>
            <li><Link to="/Category" className="hover:text-blue-600">Category</Link></li>
            <li>
              <Link to={isAuthenticated ? "/writer" : "/ContactUs"} className="hover:text-blue-600">
                {isAuthenticated ? "Create Blog" : "Contact Us"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
