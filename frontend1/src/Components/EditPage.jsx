import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogContext from "../Context/Blogcontext";

const EditPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { editBlog } = useContext(BlogContext);
    
    const blog = location.state?.blog;
    
    const [title, setTitle] = useState(blog?.title || "");
    const [description, setDescription] = useState(blog?.description || "");
    const [image, setImage] = useState(null);
    const [authorName, setAuthorName] = useState(blog?.authorName || "");
    const [previewImage, setPreviewImage] = useState(blog?.image || "");

    useEffect(() => {
        if (!blog) {
            alert("Blog data is missing! Redirecting...");
        }
    }, [blog, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        if (!blog?._id) {
            alert("Error: Blog ID is missing.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("authorName", authorName);
        if (image) {
            formData.append("image", image);
        }

        await editBlog(blog._id, formData);
        navigate("/ownerPage"); 
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 overflow-y-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <label className="block mb-2 font-semibold">Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <label className="block mb-2 font-semibold">Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <label className="block mb-2 font-semibold">Upload Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                {previewImage && (
                    <img src={previewImage} alt="Preview" className="w-full h-40 object-cover mb-4 rounded-md" />
                )}

                <label className="block mb-2 font-semibold">Author Name:</label>
                <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <button
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Update Blog
                </button>
            </div>
        </div>
    );
};

export default EditPage;
