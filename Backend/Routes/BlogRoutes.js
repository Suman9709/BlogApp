import express from 'express'

import {createBlog, getAllBlogs} from '../Controller/BlogController.js'
import { registerUser, loginUser } from '../Controller/userController.js'
import upload from '../MiddleWare/upload.js'

const router = express.Router()



router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/createblog', upload.single('image'), createBlog)
router.post('/allblogs',getAllBlogs)

export default router