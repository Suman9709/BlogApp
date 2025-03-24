import React, { useEffect, useState } from 'react';
import AllButton from './AllButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = ({ title, description, image, author, blogId, user }) => {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const navigate = useNavigate();

  const handleLikes = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.put(`http://localhost:5000/api/blogs/like/${blogId}`, {}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setLikes(data.likes);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

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
          <div className="flex items-center gap-1" onClick={handleLikes}>
            {isLiked ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-red-500" />
            )}
            <h3 className="text-sm">{likes}</h3>
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
