import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AllButton from './AllButton';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user and authentication status
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const authStatus = localStorage.getItem("isAuthenticated") === "true";

    setUser(storedUser);
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    setIsAuthenticated(false);
    alert("Logout successful");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <img src="" alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Search Bar */}
        <div className="flex items-center border border-gray-400 rounded-4xl p-2 bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <input
            type="text"
            placeholder="What you are looking for..."
            className="outline-none px-2 w-full"
          />
          <SearchIcon className="text-gray-500 cursor-pointer" />
        </div>

        {/* Navbar Links & Auth Buttons */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <ul className="flex gap-4">
            <li className="relative group">
              <a href="#Blog" className="hover:text-blue-600">Blog</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              <a href="#Category" className="hover:text-blue-600">Category</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              {isAuthenticated ? (
                <a href="/writer" className="hover:text-blue-600">Create Blog</a>
                
              ) : (
                <a href="#ContactUs" className="hover:text-blue-600">Contact Us</a>
              )}
               <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Show Profile Icon (First Letter) */}
                <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <AllButton variant="outlined" name="Logout" onClick={handleLogout} />
              </>
            ) : (
              <>
                <AllButton variant="outlined" name="Login" onClick={() => navigate("/login")} />
                <AllButton variant="contained" name="Signup" onClick={() => navigate("/signup")} />
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center">
          <ul className="flex flex-col gap-4 text-center">
            <li><a href="#Blog" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#Category" className="hover:text-blue-600">Category</a></li>
            <li>
              {isAuthenticated ? (
                <a href="/writer" className="hover:text-blue-600">Create Blog</a>
              ) : (
                <a href="#ContactUs" className="hover:text-blue-600">Contact Us</a>
              )}
            </li>
          </ul>

          {/* Authentication Buttons for Mobile */}
          <div className="flex flex-col gap-2 mt-4 w-full justify-center items-center">
            {isAuthenticated ? (
              <>
                <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <AllButton variant="outlined" name="Logout" onClick={handleLogout} />
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
