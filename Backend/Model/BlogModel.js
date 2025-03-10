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
    author: {
        type: String,
        required: true,
    },

    blogLike: {
        type: Number,
    },


}, { timestamps: true })

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;