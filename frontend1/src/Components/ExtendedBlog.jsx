import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExtendedBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/getBlogById/${id}`);
        console.log(response.data);

        setBlog(response.data.blog || response.data);
      } catch (err) {
        setError("Error fetching blog. It may not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div className="  p-6 bg-white mt-20 flex flex-col items-center overflow-y-auto">
      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title || "Blog Image"}
          className="w-52 h-52 object-cover  "
        />
      )}

      <h1 className="text-4xl font-bold mt-6">{blog?.title || "Untitled Blog"}</h1>
      <p className="text-gray-500 mt-2 text-lg">By: {blog?.authorName || "Unknown Author"}</p>
      <p className="text-gray-700 mt-4 text-lg leading-relaxed">
        {blog?.description || "No description available."}
      </p>
    </div>
  );
};

export default ExtendedBlog;
