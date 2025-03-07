import React, { useState } from 'react'
import Navbar from './Navbar'
import Card from './Card'

const OwnerPage = () => {
  const [blogs, setBlog] = useState("")
  return (
    <div className="w-[100%] min-h-screen flex justify-center flex-col">
      <Navbar />





      {/* <div className='flex w-full justify-center text-3xl font-semibold mt-40'>
        <h1>My Blog</h1>
      </div> */}

      {/* <div className="w-full flex justify-center overflow-hidden">
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
      </div> */}
    </div>

  )
}

export default OwnerPage