import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AllButton from './AllButton';  // Ensure AllButton is correctly imported
import BlogContext from '../Context/Blogcontext.js';

const LoginPage = () => {
  const { login } = useContext(BlogContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      alert("Logged in Successfully!");
      navigate("/");
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className=" overflow-hidden min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Login To BlogApp
        </h2>
        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              className="mt-1 outline-none w-full p-3 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full outline-none p-3 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-400"
            />
          </div>

          <div className="flex justify-center">
            {/* No onClick needed, form submission triggers handleLogin */}
            <AllButton variant="contained" name="Login" type="submit" onClick={handleLogin} />
          </div>
        </form>
        <div className='flex w-full items-center justify-center mt-4'>
          <p>Don't have an account?
            <Link to="/signup" className="text-purple-600 font-medium hover:underline"> SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
