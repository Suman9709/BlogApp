import express from 'express'
// import cloudinary from '../Config/cloudinaryfile.js'
import {createBlog, deleteBlog, getAllBlogs, getBlogById, getMyBlog, updateBlog} from '../Controller/BlogController.js'
import { registerUser, loginUser, logoutUser } from '../Controller/userController.js'
import {upload} from '../Config/cloudinary.js'
import verifyJWT from '../MiddleWare/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/createblog',verifyJWT, upload.single('image'), createBlog)
router.post("/logout", verifyJWT, logoutUser)
router.get('/allblogs',getAllBlogs)
// router.put('/like/:id', verifyJWT, ToggleLikes)
router.get("/myblog", verifyJWT, getMyBlog)
router.delete("/deleteBlog/:id", verifyJWT, deleteBlog)
router.put("/updateBlog/:id", verifyJWT,upload.single("image"), updateBlog)
router.get("/getBlogById/:id", getBlogById)

router.get('/ping', (req, res) => {
    return res.send('Server is running')
})

export default router
