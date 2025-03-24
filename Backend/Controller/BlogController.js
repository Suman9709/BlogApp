import Blog from '../Model/BlogModel.js'
import User from '../Model/UserSchema.js';


// export const createBlog = async (req, res) => {
//     try {

//         const { title, description, author, blogLike } = req.body
//         if (!req.file) {
//             return res.status(400)
//                 .json({
//                     message: "Image is required"
//                 });
//         }
//         // Get image URL from Cloudinary
//         const imageUrl = req.file.path
//         // const imagePath = `/uploads/${req.file.filename}`; //this is used for local storage
//         const newBlog = new Blog({
//             title,
//             description,
//             author: req.user._id,
//             blogLike: 0,
//             image: imageUrl,
//         })

//         await newBlog.save();
//         res.status(201)
//             .json({
//                 message: "Blog Created Successfully",
//                 blog: newBlog
//             })

//     }
//     catch (error) {

//         res.status(500).json({ message: 'Error creating blog', error });
//     }
// }

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
            authorName, // Directly taking the name from the request
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

// export const ToggleLikes = async () => {
//     const { id } = req.params;
//     const userId = req.user.id;

//     try {
//         const blog = await Blog.findById(id)
//         if (!blog) {
//             return res.status(404).josn({ message: "Blog not found" })
//         }

//         const index = blog.blogLike.indexOf(userId)
//         if (index === -1) {
//             blog.blogLike.push(userId);
//         }
//         else {
//             blog.blogLike.splice(isSecureContext, 1)
//         }
//         await blog.save()
//         res.status(200).json({ message: "Like status updated", likes: blog.blogLike.length })
//     } catch (error) {
//         res.status(500).json({ message: "Error updating like", error })
//     }
// }


export const getMyBlog = async (req, res) => {
    try {
        const userName = req.user.name;

        const blogs = await Blog.find({ authorName: userName });

        if (!blogs.length) {
            return res.status(404).json({ message: "No blogs found for this user" });
        }

        res.json(blogs);
    } catch (error) {
        console.error("Error fetching user blogs:", error);
        res.status(500).json({ message: "Server error", error });
    }
};
