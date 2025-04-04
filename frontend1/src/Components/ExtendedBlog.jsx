import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogContext from "../Context/Blogcontext";

const ExtendedBlog = () => {
  const { blogs, fetchBlog } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBlog(id);
        setLoading(false);
      } catch (err) {
        setError("Error fetching blog.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-6 bg-white sm:mt-20 flex flex-col items-center max-w-4xl mx-auto overflow-y-auto mt-20">
      {blogs?.image && (
        <img
          src={blogs.image}
          alt={blogs.title || "Blog Image"}
          className="w-32 h-32 sm:w-52 sm:h-52 object-cover rounded-lg shadow-lg"
        />
      )}
      <h1 className="text-2xl sm:text-4xl font-bold mt-4 sm:mt-6 text-center">
        {blogs?.title || "Untitled Blog"}
      </h1>
      <p className="text-gray-500 mt-2 text-base sm:text-lg text-center">
        By: {blogs?.authorName || "Unknown Author"}
      </p>
      <p className="text-gray-700 mt-4 text-sm sm:text-lg leading-relaxed text-center sm:text-left px-4 sm:px-0">
        {blogs?.description || "No description available."}
      </p>
    </div>
  );
};

export default ExtendedBlog;
