import React from 'react';
import AllButton from './AllButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Card = ({ title, description, image, author, count }) => {
  return (
    <div className=" rounded-lg  shadow-lg bg-white border border-gray-200 h-auto w-auto sm:h-200px flex flex-col">

      <img className="w-full h-42 object-cover " src={image} alt={title} />

      <div className="p-2 flex-grow">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
      <div className='pl-2 flex-grow'>
        <h3>{author}</h3>
        <FavoriteBorderIcon />
        <h3>{count}</h3>
      </div>
      <div className="p-2">
        <AllButton variant='contained' name='Read More' />
      </div>
    </div>
  );
};

export default Card;
