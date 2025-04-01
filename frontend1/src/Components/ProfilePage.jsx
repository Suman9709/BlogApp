import React, { useContext, useEffect } from 'react'
import BlogContext from '../Context/Blogcontext'
import BlogCard from './BlogCard'

const ProfilePage = () => {
    const { blogs, ownBlogs, removeBlog } = useContext(BlogContext)

    useEffect(() => {
        ownBlogs();
    }, [])


    const handleDelete = async (id) => {
        await removeBlog(id);
        ownBlogs()
    }


    return (
        <div className='flex gap-5 justify-center flex-col mt-20'>
            <div className='w-full  justify-center flex mt-4'>
                <p className='text-4xl font-semibold'>Welcome to my Blogs</p>
            </div>

            <div className='w-full flex justify-center'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard key={blog._id} blogId={blog._id} {...blog}  onDelete={handleDelete}/>
                        ))
                    ) : (
                        <p>No blogs available.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage