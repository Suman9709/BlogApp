import Blog from '../Model/BlogModel.js'


export const  createBlog = async (req, res) => {
    try {

        const { title, description, author, blogLike } = req.body
        if (!req.file) {
            return res.status(400)
                .json({
                    message: "Image is required"
                });
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const newBlog = new Blog({
            title,
            description,
            author,
            blogLike,
            image: imagePath,
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

