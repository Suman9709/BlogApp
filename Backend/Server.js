import express from 'express';
// import 'dotenv/config'; // this can also be used
import dotenv from 'dotenv';
import cors from 'cors';
// import { v2 as cloudinary } from 'cloudinary';
// import path from 'path';
import connectDB from './Config/db.js'
// import { fileURLToPath } from 'url';
import BlogRoutes from './Routes/BlogRoutes.js'


const app = express();
dotenv.config()

const PORT = process.env.PORT

connectDB()

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend to access backend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/blogs', BlogRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

