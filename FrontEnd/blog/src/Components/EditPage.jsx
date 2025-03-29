import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog; // Ensure blog is defined

  const [title, setTitle] = useState(blog?.title || "");
  const [description, setDescription] = useState(blog?.description || "");
  const [image, setImage] = useState(null); // Store selected file
  const [authorName, setAuthorName] = useState(blog?.authorName || "");
  const [previewImage, setPreviewImage] = useState(blog?.image || ""); // Preview selected image

  useEffect(() => {
    if (!blog) {
      alert("Blog data is missing! Redirecting...");
      navigate("/ownerPage");
    }
  }, [blog, navigate]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview of the selected image
    }
  };

  const handleUpdate = async () => {
    if (!blog?._id) {
      alert("Error: Blog ID is missing.");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        console.warn("No token found");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("authorName", authorName);

      if (image) {
        formData.append("image", image); // Append the selected file
      }

      await axios.put(
        `http://localhost:5000/api/blogs/updateBlog/${blog._id}`,
        formData, // Send FormData instead of JSON
        { headers: { Authorization: `Bearer ${token.accessToken}`, "Content-Type": "multipart/form-data" } }
      );

      alert("Blog updated successfully!");
      navigate("/ownerPage"); // Redirect after update
    } catch (error) {
      console.error("Error updating blog:", error.message);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-2 font-semibold">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2 font-semibold">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <label className="block mb-2 font-semibold">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        {/* Image Preview */}
        {previewImage && (
          <img src={previewImage} alt="Preview" className="w-full h-40 object-cover mb-4 rounded-md" />
        )}

        <label className="block mb-2 font-semibold">Author Name:</label>
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />

        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
};

export default EditPage;
