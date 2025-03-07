import React, { useState, useEffect } from 'react';
import AllButton from './AllButton';
import { useNavigate } from 'react-router-dom';

const Writer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [author, setAuthor] = useState('');
const navigate = useNavigate();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleUplaod = () => {
    if (!title || !description || !author) {
      alert("Fill all fields");
      return;
    }

    const newBlog = {
      title,
      description,
      author,
      image: preview || "",
    };
  
    // Fetch existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
  
    // Append new blog to the array
    const updatedBlogs = [...existingBlogs, newBlog];
  
    // Save the updated list back to localStorage
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  
    alert("Blog uploaded successfully");
    console.log("Updated blog data:", updatedBlogs);
    navigate("/");
  };
  return (
    <div className='flex w-screen h-screen justify-center items-center bg-gray-100 px-4'>


      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
        <h2 className='text-cyan-600 text-3xl font-semibold text-center'>
          Write Your Blog Post
        </h2>

        <div className='mt-4 flex flex-col items-center'>
          {preview ? (
            <img
              src={preview}
              alt='Blog Preview'
              className='w-full h-42 object-cover rounded-lg shadow-md'
            />
          ) : (
            <div className='w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg'>
              <p className='text-gray-500'>No image selected</p>
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='mt-2 text-sm text-gray-700 border-1 p-1 rounded-lg'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='title' className='block text-gray-700 font-medium'>
            Blog Title
          </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
            placeholder='Enter your blog title...'
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='description' className='block text-gray-700 font-medium'>
            Description
          </label>
          <textarea
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500'
            rows='4'
            placeholder='Write your blog content...'
          />
          <label htmlFor="author">Author: </label>
          <input type="text"
            id='auhtor'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-1 rounded-lg p-1 m-2'
          />
        </div>

        <AllButton variant="contained" name="Upload" onClick={handleUplaod} />

      </div>
    </div>
  );
};

export default Writer;
