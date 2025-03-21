import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import axios from 'axios';

const LandingPage = () => {

  const [blogs, setBlog] = useState([])
  useEffect(() => {

    // const storeBlog = JSON.parse(localStorage.getItem("blogs")) || []
    // console.log("Fetched blogs from storage:", storeBlog);
    // if (storeBlog.length > 0) {

    //   setBlog(storeBlog)
    // }


    const fetchBlogs = async ()=>{
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/allblogs");
        console.log(response.data);
        setBlog(response.data);
        
      } catch (error) {
        console.error("Error fetching blogs", error.response?.data || error.message);
      }
    }
    fetchBlogs();
  }, [])

  return (
    <div className="w-[100%] min-h-screen flex justify-center flex-col">
      <Navbar />

      <div className='flex w-full justify-center text-3xl font-semibold mt-40'>
        <h1>BlogApp</h1>
      </div>

      <div className='flex justify-center p-2 w-full'>
        <p className='text-center max-w-[600px] mx-auto mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium laboriosam delectus nostrum? Lorem ipsum dolor sit amet.
        </p>
      </div>

      <div className="w-full flex justify-center overflow-hidden">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center"
        >

          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <Card key={index} {...blog} count={index + 1} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No blogs available. <a href="/writer" className="text-blue-500 underline">Start writing one!</a>
            </p>
          )}
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
