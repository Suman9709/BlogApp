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
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isAuthenticated", "false");

    setUser(null);
    setIsAuthenticated(false);
    setIsDropdownOpen(false);

    navigate("/login");
  };


  return (
    <nav className="bg-white shadow-md fixed z-10 top-0 w-full">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <div className="flex items-center border border-gray-400 rounded-4xl p-2 bg-white w-full max-w-48 sm:max-w-sm md:max-w-sm lg:max-w-lg">
          <input
            type="text"
            placeholder="What you are looking for..."
            className="outline-none px-2 w-full"
          />
          <SearchIcon className="text-gray-500 cursor-pointer" />
        </div>

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
              {isAuthenticated ? (
                <Link to="/writer" className="hover:text-blue-600">Create Blog</Link>
              ) : (
                <Link to="/ContactUs" className="hover:text-blue-600">Contact Us</Link>
              )}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 relative">
          {isAuthenticated ? (
            <>
              <div
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user?.name.charAt(0).toUpperCase()}
              </div>

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
              <AllButton variant="outlined" name="Login" onClick={() => navigate("/login")} />
              <AllButton variant="contained" name="Signup" onClick={() => navigate("/signup")} />
            </>
          )}
        </div>

        {/* toggle button  */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
        </button>
      </div>

      {/* mobile view */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-center">
            <li><Link to="/Blog" className="hover:text-blue-600">Blog</Link></li>
            <li><Link to="/Category" className="hover:text-blue-600">Category</Link></li>
            <li>
              {isAuthenticated ? (
                <Link to="/writer" className="hover:text-blue-600">Create Blog</Link>
              ) : (
                <Link to="/ContactUs" className="hover:text-blue-600">Contact Us</Link>
              )}
            </li>
          </ul>

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
