import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import FollowersList from '../followers/components/FollowersList';
import FollowingList from '../followers/components/FollowingList';
import SuggestedUsersList from '../followers/components/SuggestedUsersList';
import { useUsers } from '../followers/hooks/useUsers';
import Loader from '../../components/Loader';
import '../followers/style/user-profile.scss';

const LeftSidebar = () => {
    const { 
        followers = [], 
        following = [], 
        othersProfile = [], 
        loading,
        followUserAction,
        unfollowUserAction
    } = useUsers();

    const [searchQuery, setSearchQuery] = useState("");
    const [actionLoading, setActionLoading] = useState({});
    const [error, setError] = useState("");

    // Helpers
    const isFollowingBack = (username) => {
        return following.some(f => f.followingID === username);
    };

    const filterList = (list, key) => {
        if (!searchQuery) return list;
        return list.filter(item => {
            const val = item[key];
            return val && val.toLowerCase().includes(searchQuery.toLowerCase());
        });
    };

    const handleFollow = async (username) => {
        setActionLoading(prev => ({ ...prev, [username]: true }));
        setError("");
        try {
            await followUserAction(username);
        } catch {
            setError(`Failed to follow ${username}`);
        } finally {
            setActionLoading(prev => ({ ...prev, [username]: false }));
        }
    };

    const handleUnfollow = async (username) => {
        setActionLoading(prev => ({ ...prev, [username]: true }));
        setError("");
        try {
            await unfollowUserAction(username);
        } catch {
            setError(`Failed to unfollow ${username}`);
        } finally {
            setActionLoading(prev => ({ ...prev, [username]: false }));
        }
    };

    const filteredFollowers = filterList(followers, "followerID");
    const filteredFollowing = filterList(following, "followingID");
    const filteredOthers = filterList(othersProfile, "username");

    return (
        <aside className="left-sidebar-discovery">
            <div className="discovery-header">
                <h2 className="sidebar-title">Explore Hub</h2>
                <SearchBar 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search people..."
                />
                {error && <div className="error-banner">{error}</div>}
            </div>

            {loading && followers.length === 0 && following.length === 0 ? (
                <Loader text="Fetching network..." />
            ) : (
                <div className="discovery-sections">
                    <section className="discovery-section">
                        <h3 className="section-heading">Followers</h3>
                        <FollowersList 
                            followers={filteredFollowers}
                            onFollowBack={handleFollow}
                            isFollowingBack={isFollowingBack}
                            actionLoading={actionLoading}
                        />
                    </section>

                    <section className="discovery-section">
                        <h3 className="section-heading">Following</h3>
                        <FollowingList 
                            following={filteredFollowing}
                            onUnfollow={handleUnfollow}
                            actionLoading={actionLoading}
                        />
                    </section>

                    <section className="discovery-section">
                        <h3 className="section-heading">Suggested for you</h3>
                        <SuggestedUsersList 
                            othersProfile={filteredOthers}
                            onFollow={handleFollow}
                            actionLoading={actionLoading}
                        />
                    </section>
                </div>
            )}
        </aside>
    );
};

export default LeftSidebar;
