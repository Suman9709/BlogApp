import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AllButton from "./AllButton";
import { useNavigate, Link } from "react-router-dom";
import logo from "../Components/ImgAssets/logo1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      setUser(userData ? JSON.parse(userData) : null);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    // Remove authentication data on logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);

    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed z-10 top-0 w-full">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Search Input */}
        <div className="flex items-center border border-gray-400 rounded-4xl p-2 bg-white w-full max-w-48 sm:max-w-sm md:max-w-sm lg:max-w-lg">
          <input type="text" placeholder="What you are looking for..." className="outline-none px-2 w-full" />
          <SearchIcon className="text-gray-500 cursor-pointer" />
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <ul className="flex gap-6">
            <li className="relative group">
              <Link to="/" className="hover:text-blue-600">Blog</Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              <Link to="/Category" className="hover:text-blue-600">Category</Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              {/* Check authentication status before rendering */}
              <Link to={isAuthenticated ? "/writer" : "/ContactUs"} className="hover:text-blue-600">
                {isAuthenticated ? "Create Blog" : "Contact Us"}
              </Link>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
          </ul>
        </div>

        {/* User Profile / Auth Buttons */}
        <div className="flex items-center gap-4 relative">
          {isAuthenticated ? (
            <>
              {/* Display user initials if authenticated */}
              <div
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold cursor-pointer"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  window.addEventListener("click", function (event) {
                    console.log("Window was clicked!");
                  });
                }
                }
              >
                <button>
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </button> {/* Ensure user exists before accessing properties */}
              </div>

              {/* User Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-8 right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md">
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
              {/* Login & Signup Buttons */}
              <AllButton variant="outlined" name="Login" onClick={() => navigate("/login")} />
              <AllButton variant="contained" name="Signup" onClick={() => navigate("/signup")} />
            </>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
        </button>
      </div>

      {/* Mobile View Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-center">
            <li><Link to="/" className="hover:text-blue-600">Blog</Link></li>
            <li><Link to="/Category" className="hover:text-blue-600">Category</Link></li>
            <li>
              {/* Mobile version of Create Blog / Contact Us */}
              <Link to={isAuthenticated ? "/writer" : "/ContactUs"} className="hover:text-blue-600">
                {isAuthenticated ? "Create Blog" : "Contact Us"}
              </Link>
            </li>
          </ul>

          {/* Authentication Section in Mobile Menu */}
          <div className="flex flex-col gap-2 mt-4 w-full justify-center items-center">
            {isAuthenticated ? (
              <>
                {isDropdownOpen && (
                  <div className="bg-white border border-gray-200 shadow-md rounded-md mt-2 w-48">
                    <ul className="flex flex-col">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/profile")}>
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
                {/* Ensure buttons are present if not authenticated */}
                <AllButton variant="outlined" name="Login" onClick={() => navigate("/login")} />
                <AllButton variant="outlined" name="Signup" onClick={() => navigate("/signup")} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
