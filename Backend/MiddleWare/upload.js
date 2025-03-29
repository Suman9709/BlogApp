import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../Config/cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogImages',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
        public_id: (req, file) => file.originalname.split('.')[0],
        transformation: [{ width: 40, height: 40, crop: "fill" }]
    }
});

const upload = multer({ storage });

export default upload;
