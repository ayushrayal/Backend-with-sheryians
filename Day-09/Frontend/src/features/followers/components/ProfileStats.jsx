import React from 'react';

const ProfileStats = ({ postsCount = 0, followersCount = 0, followingCount = 0 }) => {
    return (
        <div className="profile-stats">
            <div className="stat-item">
                <span className="stat-count">{postsCount}</span>
                <span className="stat-label">posts</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <span className="stat-count">{followersCount}</span>
                <span className="stat-label">followers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
                <span className="stat-count">{followingCount}</span>
                <span className="stat-label">following</span>
            </div>
        </div>
    );
};

export default ProfileStats;
