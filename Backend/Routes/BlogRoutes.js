import express from 'express'
// import cloudinary from '../Config/cloudinaryfile.js'
import {createBlog, getAllBlogs} from '../Controller/BlogController.js'
import { registerUser, loginUser, logout } from '../Controller/userController.js'
import {upload} from '../Config/cloudinary.js'
import verifyJWT from '../MiddleWare/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/createblog',verifyJWT, upload.single('image'), createBlog)
router.post("/logout", verifyJWT, logout)
router.get('/allblogs',getAllBlogs)

export default router
