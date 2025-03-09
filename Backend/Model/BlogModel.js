import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({

    image: {
        data: Buffer,
        contentType: String 
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


})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog;