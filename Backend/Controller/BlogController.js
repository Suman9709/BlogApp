import Blog from '../Model/BlogModel.js'
import User from '../Model/UserSchema.js';

export const createBlog = async (req, res) => {
    try {
        const { title, description, authorName } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const imageUrl = req.file.path;

        // Create a new blog with the authorName sent from Postman
        const newBlog = new Blog({
            title,
            description,
            authorName,
            authorId: req.user._id,
            blogLike: [],
            image: imageUrl,
        });

        await newBlog.save();

        res.status(201).json({
            message: "Blog Created Successfully",
            blog: newBlog,
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};

export const getMyBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized. Please log in first." });
        }

        const userId = req.user._id; // Get logged-in user's ID

        // Find blogs where authorId matches logged-in user
        const blogs = await Blog.find({ authorId: userId });

        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }

        res.status(200).json({ message: "User blogs fetched successfully", blogs });
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteBlog = async (req, res) => {

    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }


        if(blog.authorId.toString() !== req.user._id.toString()){
            return res.status(403).json({message:"Unauthorized to delete this blog"});
        }
        await Blog.findByIdAndDelete(id);

        res.status(200).json({ message: "Blog deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error in deleting blog", error })
    }
}

