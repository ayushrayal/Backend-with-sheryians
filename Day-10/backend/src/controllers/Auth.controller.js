const userModel = require("../model/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { redisClient } = require("../config/Cache")
const blackListModel = require("../model/BlackList.model");

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (userExist) {
            const isEmailMatch = userExist.email === email;
            return res.status(403).json({
                message: isEmailMatch ? "Email already exists!" : "Username already exists!"
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        });
        const Token = jwt.sign({
            id: user._id
        },
            process.env.JWT_KEY, {
            expiresIn: "7d"
        }
        )
        res.cookie("Token", Token)
        res.status(201).json({
            message: "User Created Successfully!",
            user: { id: user._id, username: user.username, email: user.email },
            Token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error: error.message,
            stack: error.stack
        });

    }
}

const loginController = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await userModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        }).select("+password");

        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const Token = jwt.sign(
            { id: user._id },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        );

        res.cookie("Token", Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            Token
        });


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
            stack: error.stack
        });
    }
}

const getProfileController = async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await userModel.findById(userID)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User profile fetched successfully",
            user
        })
    } catch (err) {
        throw err
    }
}

const logoutController = async (req, res) => {
    const Token = req.cookies.Token;
    if (!Token) {
        return res.status(400).json({ message: "No token provided" });
    }

    try {
        await redisClient.set(Token, "blackListed", "EX", 60 * 60)
        res.clearCookie("Token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message, stack: error.stack });
    }
}

module.exports = { registerController, loginController, getProfileController, logoutController };