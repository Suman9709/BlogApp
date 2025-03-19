import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'blogImages',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        public_id: (req, file) => file.originalname.split('.')[0],
    }
});

const upload = multer({ storage });

export { cloudinary, upload };  // ✅ Ensure proper export
