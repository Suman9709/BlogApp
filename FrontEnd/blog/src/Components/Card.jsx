import React, { useState } from "react";
import AllButton from "./AllButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit2.svg";

const Card = ({ title, description, image, authorName, blogId, onEdit, onDelete, isWriterPage }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleLikes = async () => {
    // Like functionality can be added here
  };

  return (
    <div className="w-[320px] h-[320px] border-2 rounded-lg shadow-lg flex flex-col bg-white md:w-60 lg:w-60 sm:w-70 group">
      
      {/* Image with Hover Edit & Delete Buttons */}
      <div className="h-40 w-full relative">
        <img className="h-60 w-60 object-cover rounded-t-lg" src={image} alt={title} />

        {/* Hover Buttons (Only on Owner Page) */}
        {isWriterPage && (
          <div className="absolute inset-0 flex justify-between items-top gap-4 bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button 
              onClick={() => onDelete(blogId)} 
              className="p-2 bg-red-500 rounded-full h-10 w-10 flex justify-center items-center hover:bg-red-700"
            >
              <img src={Delete} alt="Delete" className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onEdit(blogId)} 
              className="p-2 bg-blue-500 rounded-full h-10 w-10 flex justify-center items-center hover:bg-blue-700"
            >
              <img src={Edit} alt="Edit" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Details */}
      <div className="flex flex-col flex-grow p-3">
        <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2 mt-1">{description}</p>

        <div className="flex items-center justify-between text-gray-700 mt-auto">
          <h3 className="font-medium text-sm">{authorName}</h3>
          <div className="flex items-center gap-1 cursor-pointer" onClick={handleLikes}>
            {isLiked ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-red-500" />
            )}
            <h3 className="text-sm">{likes}</h3>
          </div>
        </div>

        <div>
          <AllButton variant="contained" name="Read More" />
        </div>
      </div>

    </div>
  );
};

export default Card;
