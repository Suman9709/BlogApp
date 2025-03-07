import React from 'react';
import AllButton from './AllButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Card = ({ title, description, image, author, count }) => {
  return (
    <div className="w-[320px] h-[350px] border-2 rounded-lg shadow-lg flex flex-col bg-white md:w-60 lg:w-60 sm:w-70">

      <div className="h-40 w-full">
        <img className="h-full w-full object-cover rounded-t-lg" src={image} alt={title} />
      </div>

      <div className="flex flex-col flex-grow p-3">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3 mt-1">{description}</p>

        <div className="flex items-center justify-between text-gray-700 mt-auto">
          <h3 className="font-medium text-sm">{author}</h3>
          <div className="flex items-center gap-1">
            <FavoriteBorderIcon className="text-red-500" />
            <h3 className="text-sm">{count}</h3>
          </div>
        </div>

        <div className="mt-2">
          <AllButton variant="contained" name="Read More" />
        </div>
      </div>
      
    </div>
  );
};

export default Card;
