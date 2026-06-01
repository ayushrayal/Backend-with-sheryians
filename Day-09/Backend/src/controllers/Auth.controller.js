const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User.model");

async function registerUser(req, res) {
    const { username, email, password, bio, profileimage } = req.body;
    const isUserExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });
    if (isUserExist) {
        return res.status(409).json({
            message: "User Already Exists!" + (isUserExist.email === email ? "Email Already Exists!" : "Username Already Exists!")
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        username, email, password: hashedPassword, bio, profileimage 
    })
    const TOKEN = jwt.sign({
        id: user._id,
        username: user.username,
    }
        ,
        process.env.JWT_TOKEN,
        {
            expiresIn: "1d"
        })
    res.cookie("TOKEN",TOKEN);
    res.status(201).json({
        message:"User Created Successfully!",
        TOKEN,
        user
    })
}

async function loginUser(req, res) {

    const { identifier, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email: identifier },
            { username: identifier }
        ]
    });

    if (!user) {
        return res.status(404).json({
            message: "User Not Found!"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            message: "Password is Incorrect!"
        });
    }

    const TOKEN = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_TOKEN,
        {
            expiresIn: "1d"
        }
    );

    res.cookie("TOKEN", TOKEN);

    res.status(200).json({
        message: "Login Successfully!",
        TOKEN,
        user
    });

}

async function PrivateRoute(req, res) {

    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "User not found!"
        });
    }

    // toggle
    user.isPrivate = !user.isPrivate;

    await user.save();

    return res.status(200).json({
        message: user.isPrivate
            ? "Your account is private now!"
            : "Your account is public now!",
        isPrivate: user.isPrivate
    });
}
async function getMe(req,res) {
    const user = req.user.id
    if(!user){
        return res.status(401).json({
    success: false,
    message: "User not authenticated"
})
    }
    const userData = await userModel.findById(user);
    res.status(200).json({
        message:"You Id",
        user:{
            username: userData.username,
            email: userData.email,
            isPrivate:userData.isPrivate,
            bio:userData.bio,
            profileImage: userData.profileImage || userData.profileimage,
            profileimage: userData.profileImage || userData.profileimage
        }
    })
}
module.exports = { registerUser, loginUser, PrivateRoute, getMe }