import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const OwnerPage = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      console.warn("No token found, redirecting...");
      navigate("/login"); // Redirect if no token
      return;
    }

    const fetchYourBlog = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/myblog", {
          headers: { Authorization: `Bearer ${token.accessToken}` },
        });

        console.log("Fetched Blogs:", response.data);
        setBlogs(response.data.blogs || []); // Ensure blogs is an array
      } catch (error) {
        console.error("Error fetching blogs:", error.response?.data || error.message);
      }
    };

    fetchYourBlog();
  }, [navigate]);


  const handleDelete = async (blogId) => {

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      console.warn("no token found")
      return
    }

    try {
      await axios.delete(`http://localhost:5000/api/blogs/deleteBlog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        }
      });
      setBlogs((prevBlog) => prevBlog.filter((blog) => blog._id !== blogId))
    } catch (error) {
      console.error("Error in deleteing blog", error.message)
      alert("Failed to delete blog")
    }
  }

  const handleEdit = (blogId) => {

  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-amber-200 py-10 mt-18">
      <h1 className="text-xl font-bold mb-4">Your Blogs</h1>

      <div className="w-full flex justify-center overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center">
          {blogs.length > 0 ? (
            blogs.map((blog) => <Card key={blog._id} blogId={blog._id} {...blog} isWriterPage={true} onDelete={handleDelete}
              onEdit={handleEdit} />)
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No blogs available.{" "}
              <Link to="/writer" className="text-blue-500 underline">
                Start writing one!
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
