import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/user-profile.scss';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../../auth/hooks/useAuth';

const UsersProfile = () => {
    const { 
        followers = [], 
        following = [], 
        othersProfile = [], 
        loading: profilesLoading,
        followUserAction,
        unfollowUserAction
    } = useUsers();

    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const [actionLoading, setActionLoading] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    // Helper: Check if we are following a follower back
    const isFollowingBack = (followerUsername) => {
        return following.some(f => f.followingID === followerUsername);
    };

    // Follow action handler with local loading state and error alert
    const handleFollow = async (username) => {
        setActionLoading(prev => ({ ...prev, [username]: true }));
        setErrorMessage("");
        try {
            await followUserAction(username);
        } catch (err) {
            setErrorMessage(`Failed to follow ${username}. Please try again.`);
        } finally {
            setActionLoading(prev => ({ ...prev, [username]: false }));
        }
    };

    // Unfollow action handler
    const handleUnfollow = async (username) => {
        setActionLoading(prev => ({ ...prev, [username]: true }));
        setErrorMessage("");
        try {
            await unfollowUserAction(username);
        } catch (err) {
            setErrorMessage(`Failed to unfollow ${username}. Please try again.`);
        } finally {
            setActionLoading(prev => ({ ...prev, [username]: false }));
        }
    };

    // Logout handler
    const onLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    const handleEditProfile = () => {
        alert("Edit Profile functionality is coming soon!");
    };

    const currentUserAvatar = user?.profileImage || user?.profileimage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";

    return (
        <>
            {/* LEFT SIDEBAR - USER DISCOVERY PANEL */}
            <aside className="left-sidebar-discovery">
                <div className="discovery-header">
                    <h2 className="sidebar-title">Explore People</h2>
                    {errorMessage && <div className="error-banner">{errorMessage}</div>}
                </div>

                {profilesLoading && followers.length === 0 && following.length === 0 && othersProfile.length === 0 ? (
                    <div className="sidebar-loading">
                        <div className="spinner"></div>
                        <p>Loading profiles...</p>
                    </div>
                ) : (
                    <div className="discovery-sections">
                        {/* 1. FOLLOWERS SECTION */}
                        <section className="discovery-section">
                            <h3 className="section-heading">Followers</h3>
                            <div className="card-list">
                                {followers.length === 0 ? (
                                    <div className="empty-state">No followers yet</div>
                                ) : (
                                    followers.map((follower) => {
                                        const username = follower.followerID;
                                        const img = follower.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
                                        const isFollowing = isFollowingBack(username);
                                        const isLoading = actionLoading[username];

                                        return (
                                            <div key={follower._id || username} className="user-card hover-lift">
                                                <div className="user-card-info">
                                                    <div className="avatar-ring">
                                                        <img src={img} alt={`${username}'s avatar`} className="user-avatar" />
                                                    </div>
                                                    <span className="user-card-username" title={username}>{username}</span>
                                                </div>
                                                <div className="user-card-action">
                                                    {isFollowing ? (
                                                        <span className="badge-following">Following</span>
                                                    ) : (
                                                        <button 
                                                            className="btn-follow-back"
                                                            disabled={isLoading}
                                                            onClick={() => handleFollow(username)}
                                                        >
                                                            {isLoading ? <span className="mini-spinner"></span> : "Follow Back"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        {/* 2. FOLLOWING SECTION */}
                        <section className="discovery-section">
                            <h3 className="section-heading">Following</h3>
                            <div className="card-list">
                                {following.length === 0 ? (
                                    <div className="empty-state">Not following anyone yet</div>
                                ) : (
                                    following.map((followed) => {
                                        const username = followed.followingID;
                                        const img = followed.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
                                        const isLoading = actionLoading[username];

                                        return (
                                            <div key={followed._id || username} className="user-card hover-lift">
                                                <div className="user-card-info">
                                                    <div className="avatar-ring">
                                                        <img src={img} alt={`${username}'s avatar`} className="user-avatar" />
                                                    </div>
                                                    <span className="user-card-username" title={username}>{username}</span>
                                                </div>
                                                <div className="user-card-action">
                                                    <button 
                                                        className="btn-unfollow"
                                                        disabled={isLoading}
                                                        onClick={() => handleUnfollow(username)}
                                                    >
                                                        {isLoading ? <span className="mini-spinner"></span> : "Following"}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        {/* 3. OTHERS SECTION (SUGGESTIONS) */}
                        <section className="discovery-section">
                            <h3 className="section-heading">Suggested for you</h3>
                            <div className="card-list">
                                {othersProfile.length === 0 ? (
                                    <div className="empty-state">No suggested users</div>
                                ) : (
                                    othersProfile.map((userSuggestion) => {
                                        const username = userSuggestion.username;
                                        const img = userSuggestion.profileImage || "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
                                        const isLoading = actionLoading[username];

                                        return (
                                            <div key={username} className="user-card hover-lift">
                                                <div className="user-card-info">
                                                    <div className="avatar-ring">
                                                        <img src={img} alt={`${username}'s avatar`} className="user-avatar" />
                                                    </div>
                                                    <div className="user-details">
                                                        <span className="user-card-username" title={username}>{username}</span>
                                                        {userSuggestion.bio && <span className="user-card-bio">{userSuggestion.bio}</span>}
                                                    </div>
                                                </div>
                                                <div className="user-card-action">
                                                    <button 
                                                        className="btn-follow"
                                                        disabled={isLoading}
                                                        onClick={() => handleFollow(username)}
                                                    >
                                                        {isLoading ? <span className="mini-spinner"></span> : "Follow"}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </aside>

            {/* RIGHT SIDEBAR - PROFILE CARD */}
            <aside className="right-sidebar-profile">
                {user ? (
                    <div className="profile-card">
                        <div className="profile-banner"></div>
                        <div className="profile-card-content">
                            <div className="profile-avatar-wrapper">
                                <img src={currentUserAvatar} alt="My profile avatar" className="profile-avatar-img" />
                            </div>
                            
                            <h2 className="profile-username">@{user.username}</h2>
                            <p className="profile-email">{user.email}</p>
                            
                            {user.bio ? (
                                <p className="profile-bio">"{user.bio}"</p>
                            ) : (
                                <p className="profile-bio-placeholder">No bio added yet</p>
                            )}

                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-count">{followers.length}</span>
                                    <span className="stat-label">followers</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-count">{following.length}</span>
                                    <span className="stat-label">following</span>
                                </div>
                            </div>

                            <div className="profile-actions">
                                <button className="btn-edit-profile" onClick={handleEditProfile}>
                                    Edit Profile
                                </button>
                                <button className="btn-logout" onClick={onLogoutClick}>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="profile-card-empty">
                        <p>Please log in to view your profile</p>
                        <button className="btn-login-redirect" onClick={() => navigate('/login')}>
                            Log In
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};

export default UsersProfile;