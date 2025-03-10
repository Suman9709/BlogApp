import express from 'express';
// import 'dotenv/config'; // this can also be used
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './Config/db.js'
import { fileURLToPath } from 'url';
import BlogRoutes from './Routes/BlogRoutes.js'


const app = express();
dotenv.config()

const PORT = process.env.PORT

connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/blogs', BlogRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
