import express from 'express'
// import cloudinary from '../Config/cloudinaryfile.js'
import {createBlog, getAllBlogs} from '../Controller/BlogController.js'
import { registerUser, loginUser } from '../Controller/userController.js'
import {upload} from '../Config/cloudinary.js'

const router = express.Router()



router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/createblog', upload.single('image'), createBlog)
router.get('/allblogs',getAllBlogs)

export default router