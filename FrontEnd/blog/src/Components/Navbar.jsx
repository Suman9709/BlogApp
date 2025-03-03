import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AllButton from './AllButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div>
          <img src="" alt="Logo" className="h-10 w-auto" />
        </div>

        <div className="flex items-center border border-gray-400 rounded-lg p-2 bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <input
            type="text"
            placeholder="What you are looking for..."
            className="outline-none px-2 w-full"
          />
          <SearchIcon className="text-gray-500 cursor-pointer" />
        </div>

        <div className="hidden md:flex items-center justify-center gap-4">
          <ul className="flex gap-4">
            <li className="relative group">
              <a href="#Blog" className="hover:text-blue-600">Blog</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              <a href="#About Us" className="hover:text-blue-600">Category</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
            <li className="relative group">
              <a href="#Contact Us" className="hover:text-blue-600">Contact Us</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full rounded-lg"></span>
            </li>
          </ul>
          <AllButton variant="outline" name="Login" />
          <AllButton variant="contained" name="SignUp"  />
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon className="text-2xl" /> : <MenuIcon className="text-2xl" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4 flex justify-center flex-col">

          <ul className="flex flex-col gap-4 text-center">
            <li>
              <a href="#Blog" className="hover:text-blue-600">Blog</a>
            </li>
            <li>
              <a href="#About Us" className="hover:text-blue-600">About Us</a>
            </li>
            <li>
              <a href="#Contact Us" className="hover:text-blue-600">Contact Us</a>
            </li>
          </ul>

          <div className="flex flex-col gap-2 mt-4 w-full justify-center items-center">
            <AllButton variant="outlined" name="Login" />
            <AllButton variant="contained" name="SignUp" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
