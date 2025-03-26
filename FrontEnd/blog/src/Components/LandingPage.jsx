import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const LandingPage = () => {
  const [blogs, setBlog] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/allblogs");
        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error.response?.data || error.message);
      }
    };

    const storeUser = localStorage.getItem("user");
    if (storeUser) {
      setUser(JSON.parse(storeUser));
      console.log("User from localStorage:", JSON.parse(storeUser));
    } else {
      console.log("No user found in localStorage");
    }
    
    fetchBlogs();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {/* Title */}
      <div className="w-full text-center mt-40">
        <h1 className="text-3xl font-semibold">ExpressInk</h1>
      </div>

      {/* Description */}
      <div className="w-full flex justify-center p-2">
        <p className="text-center max-w-[600px] mx-auto mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium laboriosam delectus nostrum? Lorem ipsum dolor sit amet.
        </p>
      </div>

      {/* Blog Cards Section */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center mx-auto">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card key={blog._id} blogId={blog._id} {...blog} user={user} isWriterPage={false} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg w-full">
              No blogs available. <a href="/writer" className="text-blue-500 underline">Start writing one!</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
