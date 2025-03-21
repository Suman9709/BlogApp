import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AllButton from './AllButton';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // const storeUser = JSON.parse(localStorage.getItem('user'));

    // if (storeUser && storeUser.username === username && storeUser.password === password) {
    //   localStorage.setItem("isAuthenticated", "true")
    //   alert("Login successfull")
    //   navigate("/")
    // }
    // else {
    //   alert("Invalid username or password");
    // }

    setError(" ")
    try {
      const response = await axios.post("http://localhost:5000/api/blogs/login", {
        username, password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);

      localStorage.getItem('user', JSON.stringify(user))
      localStorage.setItem("isAuthenticated", "true")
      alert("Login successful");
      navigate('/');

    } catch (error) {
      console.error('Login error', error.response?.data?.message)
      setError(error.response?.data?.message || 'Login failed');
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
              className="mt-1 w-full outline-none p-3 border  rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 focus:shadow-purple-400"
            />
          </div>

          <div className="flex justify-center">
            <AllButton variant="contained" name="Login" onClick={handleLogin} />
          </div>
        </form>
        <div className='flex w-full  items-center justify-center mt-4'>
          <p>Don't have an account?
            <Link to="/signup"> SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
