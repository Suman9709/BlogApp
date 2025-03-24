
// import jwt from "jsonwebtoken";
// import User from "../Model/UserSchema.js";

// const verifyJWT = async (req, res, next) => {
//     try {
//         console.log("Full Headers Received:", req.headers); 

//         const authHeader = req.headers["authorization"];
//         console.log("Auth Header:", authHeader || "No Authorization Header Received"); 

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(403).json({ message: "Access Denied: No Token Provided" });
//         }

//         const token = authHeader.split(" ")[1];
//         console.log("Extracted Token:", token); 

//         if (!token) {
//             return res.status(403).json({ message: "Access Denied: No Token Provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
//         req.user = await User.findById(decoded._id).select("-password");

//         if (!req.user) {
//             return res.status(401).json({ message: "User not found" });
//         }

//         next();
//     } catch (error) {
//         console.error("JWT Verification Error:", error);
//         res.status(401).json({ message: "Invalid or expired token" });
//     }
// };

// export default verifyJWT;


import jwt from "jsonwebtoken";
import User from "../Model/UserSchema.js";

const verifyJWT = async (req, res, next) => {
    try {
        console.log("Full Headers Received:", req.headers); 

        const authHeader = req.headers["authorization"];
        console.log("Auth Header:", authHeader || "No Authorization Header Received"); 

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token); 

        if (!token) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }

        // ⚠️ Potential Issue: If `process.env.JWT_ACCESS_TOKEN_SECRET` is undefined, jwt.verify will throw an error.
        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            console.error("JWT_ACCESS_TOKEN_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server error: Token secret not configured" });
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        console.log("Decoded Token:", decoded); // ✅ Debugging token decoding

        // ⚠️ Potential Issue: `decoded._id` should match the stored user ID format.
        if (!decoded._id) {
            console.error("Decoded token does not contain _id");
            return res.status(400).json({ message: "Invalid token structure" });
        }

        req.user = await User.findById(decoded._id).select("-password");

        // ⚠️ Potential Issue: If `User.findById` returns null, it means the user does not exist in the database.
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // ✅ Log only the error message for clarity
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export default verifyJWT;
