import Blog from '../Model/BlogModel.js'


export const createBlog = async (req, res) => {
    try {

        const { title, description, author, blogLike } = req.body
        if (!req.file) {
            return res.status(400)
                .json({
                    message: "Image is required"
                });
        }
        // Get image URL from Cloudinary
        const imageUrl = req.file.path
        // const imagePath = `/uploads/${req.file.filename}`; //this is used for local storage
        const newBlog = new Blog({
            title,
            description,
            author,
            blogLike:0,
            image: imageUrl,
        })

        await newBlog.save();
        res.status(201)
            .json({
                message: "Blog Created Successfully",
                blog: newBlog
            })

    }
    catch (error) {

        res.status(500).json({ message: 'Error creating blog', error });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
};