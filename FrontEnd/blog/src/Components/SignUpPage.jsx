import React, { useState } from 'react';
import AllButton from './AllButton';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, username, password }
    if (!name || !username || !password) {
      alert("please enter the credential")
      return
    }
    localStorage.setItem('user', JSON.stringify(user))
    alert('SignUp successfully, you can login now')
    navigate("/login")
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6" >

          <div>
            <label htmlFor="name" className="block text-2xl font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-3 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-2xl font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-3 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-2xl font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border outline-none border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className='flex justify-center'>
            <AllButton variant='contained' name='SignUp'onClick={handleSubmit} />
          </div>
        </form>
        <div className='flex w-full  items-center justify-center mt-4'>
          <p>Already have an account <a href="/login"> Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
