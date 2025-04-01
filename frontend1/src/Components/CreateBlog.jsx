import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogContext from '../Context/Blogcontext';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [authorName, setAuthorName] = useState('');
  const navigate = useNavigate();

  const { blogcreate } = useContext(BlogContext); // Use context

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!title || !description || !authorName || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('authorName', authorName);
    formData.append('image', image);

    try {
      await blogcreate(formData); 
      alert("Blog uploaded successfully");
      navigate("/"); 
    } catch (error) {
      alert("Failed to upload blog: " + error.message); 
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-cyan-600 text-3xl font-semibold text-center">
          Write Your Blog Post
        </h2>

        <div className="mt-4 flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Blog Preview"
              className="w-full h-42 object-cover rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full h-48 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-2 text-sm text-gray-700 border-1 p-1 rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Enter your blog title..."
          />
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-2 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            rows="4"
            placeholder="Write your blog content..."
          />
        </div>

        <div className="mt-4">
          <label htmlFor="author" className="block text-gray-700 font-medium">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full p-2 border rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Enter your name..."
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full mt-4 bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-cyan-700 transition duration-300"
        >
          Upload Blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
