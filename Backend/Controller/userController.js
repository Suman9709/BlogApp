import User from '../Model/UserSchema.js'
import jwt from 'jsonwebtoken'

//register user
export const registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body

        //check for existing user

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400)
                .json(
                    {
                        message: "Username Already taken"
                    }
                )
        }

        //create new user
        const newUser = new User({ name, username, password });
        await newUser.save()
        console.log("new user: ", newUser);


        //generate AccessToken
        const token = newUser.generateAccessToken();
        console.log("token:", token);

        res.status(201).json({
            message: "User Registered Successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username
            }
        });


    } catch (error) {
        res.status(500).json({
            message: "User Registration fail", error
        })
    }
}


//Login user

export const loginUser = async (req, res) => {
    try {

        const { username, password } = req.body

        if (!username || !password) {
            res.status(401).json({ message: "Please enter username and password" })
        }

        const user = await User.findOne({ username });
        //check user
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        console.log("user: ", user);

        //password match

        const match = await user.isPasswordCorrect(password)

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = user.generateAccessToken();
        console.log(token)

        res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Login failed", error });
    }
}

//logout
export const logout = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(403).json({ message: "Access Denied: No Token Provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);

        // const user = await User.findById(decoded._id);
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }
        // user.refreshToken = null;
        // await user.save();

        // res.status(200).json({ message: "Logged out successfully" });

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: "Loggedout successfully" })
    } catch (error) {
        console.error("Logout error:", error);
        res.status(401).json({ message: "Invalid or expired token", error });
    }
};



