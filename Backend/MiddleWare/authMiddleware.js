import jwt from "jsonwebtoken";
import User from "../Model/UserSchema.js";

const verifyJWT = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        
        // Fetch user and attach to request object
        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next(); // Proceed to the next middleware or route
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
export default verifyJWT;