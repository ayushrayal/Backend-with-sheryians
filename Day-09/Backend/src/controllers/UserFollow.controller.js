const followerModel = require("../models/Followers.model");
const userModel = require("../models/User.model");
async function UserFollowController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    const isFolloweeExists = await userModel.findOne({username: followeeUsername});
    if(!isFolloweeExists){
        return res.status(401).json({
            message:"This user not exists!"
        })
    }
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"You can't follow yourself!"
        })
    }
    const isFollowingExists = await followerModel.findOne({
        followerID:followerUsername,
        followingID:followeeUsername
    })
    if(isFollowingExists){
        return res.status(400).json({
            message:`You already follow this ${followeeUsername} user!`
        })
    }
    const FollowedUser = await followerModel.create({
        followerID:followerUsername,
        followingID:followeeUsername
    })
    res.status(200).json({
        message:"User Followed Successfully!",
        FollowedUser
    })
}

async function UserUnfollowController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    const isFollow = await followerModel.findOne({
        followerID:followerUsername,
        followingID:followeeUsername
    })
    if(!isFollow){
        return res.status(400).json({
            message:`You are not following this ${followeeUsername} user!`
        })
    }
    await followerModel.findByIdAndDelete(isFollow._id)
    res.status(200).json({
        message:"User Unfollowed Successfully!"
    })
}
async function getFollowersController(req,res){
    try {
        const user = req.user.username;
        const followers = await followerModel.find({
            followingID: user
        });

        // Load profile details (profileImage, bio, email) for each follower
        const followerUsernames = followers.map(f => f.followerID);
        const users = await userModel.find({ username: { $in: followerUsernames } }, "username profileImage bio email");

        const userMap = {};
        users.forEach(u => {
            userMap[u.username] = u;
        });

        const followersWithDetails = followers.map(f => {
            const profile = userMap[f.followerID];
            const img = profile?.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
            return {
                _id: f._id,
                followerID: f.followerID,
                followingID: f.followingID,
                profileImage: img,
                profileimage: img, // backwards compatibility
                bio: profile?.bio || "",
                email: profile?.email || ""
            };
        });

        res.status(200).json({
            message: `Your total followers is ${followers.length}`,
            followers: followersWithDetails
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching followers", error: err.message });
    }
}
async function getFollowingController(req,res){
    try {
        const user = req.user.username;
        const following = await followerModel.find({
            followerID: user
        });

        // Load profile details (profileImage, bio, email) for each followed user
        const followingUsernames = following.map(f => f.followingID);
        const users = await userModel.find({ username: { $in: followingUsernames } }, "username profileImage bio email");

        const userMap = {};
        users.forEach(u => {
            userMap[u.username] = u;
        });

        const followingWithDetails = following.map(f => {
            const profile = userMap[f.followingID];
            const img = profile?.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
            return {
                _id: f._id,
                followerID: f.followerID,
                followingID: f.followingID,
                profileImage: img,
                profileimage: img, // backwards compatibility
                bio: profile?.bio || "",
                email: profile?.email || ""
            };
        });

        res.status(200).json({
            message: `Your total following is ${following.length}`,
            following: followingWithDetails
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching following", error: err.message });
    }
}
async function othersProfileController(req, res) {
    try {
        const currentUser = req.user.username;

        const followers = await followerModel.find({
            followingID: currentUser
        });

        const following = await followerModel.find({
            followerID: currentUser
        });

        const followerUsernames = followers.map(
            user => user.followerID
        );

        const followingUsernames = following.map(
            user => user.followingID
        );

        // Fetch all users with profileImage (camelCase)
        const allUsers = await userModel.find(
            {},
            "username profileImage bio email"
        );

        const otherUsers = allUsers.filter(user =>
            user.username !== currentUser &&
            !followerUsernames.includes(user.username) &&
            !followingUsernames.includes(user.username)
        ).map(user => {
            const img = user.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
            return {
                username: user.username,
                profileImage: img,
                profileimage: img, // backwards compatibility
                bio: user.bio || "",
                email: user.email || ""
            };
        });

        return res.status(200).json({
            message: "Other users fetched successfully",
            count: otherUsers.length,
            otherUsers
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}
module.exports = {UserFollowController, UserUnfollowController, getFollowersController, getFollowingController, othersProfileController}