import jwt from "jsonwebtoken";
import User from "../Model/UserSchema.js";

const verifyJWT = async (req, res, next) => {
    try {
        // console.log("Headers Received:", req.headers);

        const authHeader = req.headers["authorization"];
        // console.log("Auth Header:", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }

        const token = authHeader.split(" ")[1];
        // console.log("Extracted Token:", token);

        if (!token) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decoded._id).select("-password");

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default verifyJWT;
