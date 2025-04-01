import React, { useContext, useEffect } from 'react'
import BlogContext from '../Context/Blogcontext'
import BlogCard from './BlogCard'

const ProfilePage = () => {
    const { blogs, ownBlogs } = useContext(BlogContext)

    useEffect(() => {
        ownBlogs();
    }, [ownBlogs])
    return (
        <div className='flex gap-5 justify-center flex-col mt-20'>
            <div>ProfilePage</div>

            <div className='w-full flex justify-center'>
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
    )
}

export default ProfilePage