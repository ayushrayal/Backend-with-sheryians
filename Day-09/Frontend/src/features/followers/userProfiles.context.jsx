import { createContext, useEffect, useState } from "react";
import { getFollowers, getFollowing, getOthersProfile, followUser, unfollowUser } from "./services/userProfiles.api";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersProfileContext = createContext(null);

export function UsersProfileProvider({ children }) {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [othersProfile, setOthersProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useAuth();
    const currentUser = auth?.user;

    const handleFollowers = async () => {
        try {
            setLoading(true);
            const response = await getFollowers();
            console.log("Followers Response:", response);
            setFollowers(response.followers || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowing = async () => {
        try {
            setLoading(true);
            const response = await getFollowing();
            console.log("Following Response:", response);
            setFollowing(response.following || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOthersProfile = async () => {
        try {
            setLoading(true);
            const response = await getOthersProfile();
            setOthersProfile(response.otherUsers || []);
            console.log("Others Profile Response:", response);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const followUserAction = async (username) => {
        if (!currentUser) return;
        const prevOthers = [...othersProfile];
        const prevFollowing = [...following];
        const prevFollowers = [...followers];

        let targetUser = othersProfile.find(u => u.username === username);
        if (!targetUser) {
            const followerItem = followers.find(f => f.followerID === username);
            if (followerItem) {
                targetUser = {
                    username: followerItem.followerID,
                    profileImage: followerItem.profileImage,
                    bio: followerItem.bio
                };
            }
        }

        // Optimistic state updates
        setOthersProfile(prev => prev.filter(u => u.username !== username));
        
        const newFollowingItem = {
            _id: `temp-${Date.now()}`,
            followerID: currentUser.username,
            followingID: username,
            profileImage: targetUser?.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107",
            bio: targetUser?.bio || ""
        };
        setFollowing(prev => [...prev, newFollowingItem]);

        try {
            await followUser(username);
            // Refresh in background to get real DB ids
            handleFollowing();
            handleOthersProfile();
            handleFollowers();
        } catch (err) {
            console.error("Failed to follow user, rolling back:", err);
            setOthersProfile(prevOthers);
            setFollowing(prevFollowing);
            setFollowers(prevFollowers);
            throw err;
        }
    };

    const unfollowUserAction = async (username) => {
        if (!currentUser) return;
        const prevOthers = [...othersProfile];
        const prevFollowing = [...following];
        const prevFollowers = [...followers];

        const followedItem = following.find(f => f.followingID === username);

        // Optimistic state updates
        setFollowing(prev => prev.filter(f => f.followingID !== username));
        
        const isFollower = followers.some(f => f.followerID === username);
        if (!isFollower && followedItem) {
            const returnedUser = {
                username: username,
                profileImage: followedItem.profileImage,
                bio: followedItem.bio || ""
            };
            setOthersProfile(prev => [...prev, returnedUser]);
        }

        try {
            await unfollowUser(username);
            handleFollowing();
            handleOthersProfile();
            handleFollowers();
        } catch (err) {
            console.error("Failed to unfollow user, rolling back:", err);
            setOthersProfile(prevOthers);
            setFollowing(prevFollowing);
            setFollowers(prevFollowers);
            throw err;
        }
    };

    useEffect(() => {
        if (currentUser) {
            handleFollowers();
            handleFollowing();
            handleOthersProfile();
        } else {
            setFollowers([]);
            setFollowing([]);
            setOthersProfile([]);
        }
    }, [currentUser]);

    return (
        <UsersProfileContext.Provider
            value={{
                followers,
                following,
                othersProfile,
                loading,
                setFollowers,
                setFollowing,
                setLoading,
                followUserAction,
                unfollowUserAction,
                getFollowers: handleFollowers,
                getFollowing: handleFollowing,
                getOthersProfile: handleOthersProfile
            }}
        >
            {children}
        </UsersProfileContext.Provider>
    );
}
