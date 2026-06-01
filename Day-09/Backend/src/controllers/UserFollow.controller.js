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
    const user = req.user.username;
    const followers = await followerModel.find({
    followingID: user
   });
   if(!followers){
    return res.status(200).json({
        message:"You have Zero followers"
    })
   }
   res.status(200).json({
    message:`Your total followers is ${followers.length}`,
    followers
   })
}
async function getFollowingController(req,res){
    const user = req.user.username;

    const following = await followerModel.find({
        followerID: user
    });

    if(following.length === 0){
        return res.status(200).json({
            message:"You have Zero following!",
            following:[]
        });
    }

    res.status(200).json({
        message:`Your total following is ${following.length}`,
        following
    });

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

        const allUsers = await userModel.find(
            {},
            "username profileimage bio"
        );

        const otherUsers = allUsers.filter(user =>
            user.username !== currentUser &&
            !followerUsernames.includes(user.username) &&
            !followingUsernames.includes(user.username)
        );

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