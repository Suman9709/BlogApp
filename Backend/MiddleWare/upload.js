import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../Config/cloudinary.js'

// Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogImages', // Folder name in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed formats
        public_id: (req, file) => file.originalname.split('.')[0] // Use original filename
    }
});

const upload = multer({ storage });

export default upload;
