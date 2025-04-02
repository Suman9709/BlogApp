import React, { useContext, useEffect } from 'react';
import BlogCard from './BlogCard';
import BlogContext from '../Context/Blogcontext';

const MainPage = () => {
    const { blogs, getallBlogs } = useContext(BlogContext);
    useEffect(() => {
        getallBlogs();
    }, []);

    return (
        <div className="flex gap-5 justify-center flex-col ">
            <div className="w-full text-center mt-32">
                <h1 className="text-3xl font-semibold">ExpressInk</h1>
            </div>

            <div className="w-full flex justify-center p-2">
                <p className="text-center ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium laboriosam delectus nostrum?
                </p>
            </div>

            <div className='flex justify-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard key={blog._id} blogId={blog._id} {...blog} />
                        ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
