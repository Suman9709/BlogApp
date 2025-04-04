import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authorName: {  
        type: String,
        required: true,
    },
    authorId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    blogLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
