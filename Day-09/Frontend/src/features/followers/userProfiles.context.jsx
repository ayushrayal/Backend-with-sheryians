import { createContext, useEffect, useState } from "react";
import { getFollowers, getFollowing, getOthersProfile } from "./services/userProfiles.api";

export const UsersProfileContext = createContext(null);

export function UsersProfileProvider({ children }) {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [othersProfile, setOthersProfile] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFollowers = async () => {
        try {
            setLoading(true);
            const response = await getFollowers();

            console.log("Followers Response:", response);

            setFollowers(response.followers);
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

            setFollowing(response.following);
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
            setOthersProfile(response.otherUsers);
            console.log("Others Profile Response:", response);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFollowers();
        handleFollowing();
        handleOthersProfile();
    }, []);

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
                getFollowers: handleFollowers,
                getFollowing: handleFollowing,
                getOthersProfile: handleOthersProfile
            }}
        >
            {children}
        </UsersProfileContext.Provider>
    );
}
