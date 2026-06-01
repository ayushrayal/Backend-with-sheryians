import React from 'react';
import UserCard from './UserCard';
import EmptyState from '../../../components/EmptyState';

const FollowersList = ({ followers = [], onFollowBack, isFollowingBack, actionLoading = {} }) => {
    if (followers.length === 0) {
        return <EmptyState title="No followers yet" message="When people follow you, they will appear here." />;
    }

    return (
        <div className="card-list">
            {followers.map((follower) => {
                const username = follower.followerID;
                const img = follower.profileImage;
                const followingBack = isFollowingBack(username);
                const isLoading = !!actionLoading[username];

                return (
                    <UserCard 
                        key={follower._id || username}
                        username={username}
                        profileImage={img}
                        actionType={followingBack ? "none" : "follow-back"}
                        onAction={() => onFollowBack(username)}
                        loading={isLoading}
                    />
                );
            })}
        </div>
    );
};

export default FollowersList;
