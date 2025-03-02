import React from 'react';
import Navbar from './Navbar';
import Card from './Card';

const LandingPage = () => {

  const blogs = Array.from({ length: 20 }, (_, index) => ({
    title: `Blog Post `,
    description: `This is a short description for blog post ${index + 1}. Learn more about it here.`,
    image: `https://source.unsplash.com/400x300/?technology`
  }));

  return (
    <div className="w-screen min-h-screen">
      <Navbar />

      <div className='flex w-full justify-center text-3xl font-semibold mt-10'>
        <h1>BlogApp</h1>
      </div>

      <div className='flex justify-center p-2 w-full'>
        <p className='text-center max-w-[600px] mx-auto mt-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Accusantium laboriosam delectus nostrum? Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="w-full flex justify-center overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
                        justify-items-center gap-6 p-6">
          {blogs.map((blog, index) => (
            <Card key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
