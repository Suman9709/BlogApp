import User from '../Model/UserSchema.js'
import jwt from 'jsonwebtoken'

//register user
export const registerUser = async (req, res) => {
    try {
        const { name, username, password } = req.body


        // validate all inputs

        if (!name || !username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
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
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();
        console.log("Access token:", accessToken);
        console.log("refresh token:", refreshToken);

        res.status(201).json({
            message: "User Registered Successfully",
            token: {
                accessToken,
                refreshToken
            },
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

        //validate field
        if (!username || !password) {
            res.status(401).json({ message: "Please enter username and password" })
        }

        const user = await User.findOne({ username });
        //check user
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials username is not register" })
        }
        console.log("user found: ", user);

        //password match

        const isPasswordMatch = await user.isPasswordCorrect(password)

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials password si not correct" })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        console.log("Access Token", accessToken)
        console.log("Refresh Token", refreshToken)

        res.status(200).json({
            message: "Login successfully",
            token: {
                accessToken,
                refreshToken
            },
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
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", { httpOnly: true, secure: true, sameSite: "None" });
        
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
    }
};



