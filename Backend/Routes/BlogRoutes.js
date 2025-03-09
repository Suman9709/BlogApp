import express from 'express'

import {createBlog} from '../Controller/BlogController.js'
import upload from '../MiddleWare/upload.js'

const router = express.Router()


router.post('/', upload.single('image'), createBlog)

export default router