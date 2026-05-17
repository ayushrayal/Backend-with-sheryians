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
    const followers = await followerModel.find({
    followerID: user
   });
   if(!followers){
    return res.status(200).json({
        message:"You have Zero following!"
    })
   }
   res.status(200).json({
    message:`Your total following is ${followers.length}`,
    followers
   })
}
module.exports = {UserFollowController, UserUnfollowController, getFollowersController, getFollowingController}