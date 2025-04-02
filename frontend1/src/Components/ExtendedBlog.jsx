import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../Services/Api"; // Adjust path if needed

const ExtendedBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const data = await getBlogById(id);

      if (data.success) {
        setBlog(data.blog || data); 
      } else {
        setError(data.message || "Error fetching blog.");
      }

      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-6 bg-white sm:mt-20 flex flex-col items-center max-w-4xl mx-auto overflow-y-auto mt-20">
      {blog?.image && (
        <img
          src={blog.image}
          alt={blog.title || "Blog Image"}
          className="w-32 h-32 sm:w-52 sm:h-52 object-cover rounded-lg shadow-lg"
        />
      )}
      <h1 className="text-2xl sm:text-4xl font-bold mt-4 sm:mt-6 text-center">
        {blog?.title || "Untitled Blog"}
      </h1>
      <p className="text-gray-500 mt-2 text-base sm:text-lg text-center">
        By: {blog?.authorName || "Unknown Author"}
      </p>
      <p className="text-gray-700 mt-4 text-sm sm:text-lg leading-relaxed text-center sm:text-left px-4 sm:px-0">
        {blog?.description || "No description available."}
      </p>
    </div>
  );
};

export default ExtendedBlog;
