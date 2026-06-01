import React from 'react';
import UserCard from './UserCard';
import EmptyState from '../../../components/EmptyState';

const FollowingList = ({ following = [], onUnfollow, actionLoading = {} }) => {
    if (following.length === 0) {
        return <EmptyState title="Not following anyone" message="People you follow will show up here." />;
    }

    return (
        <div className="card-list">
            {following.map((followed) => {
                const username = followed.followingID;
                const img = followed.profileImage;
                const isLoading = !!actionLoading[username];

                return (
                    <UserCard 
                        key={followed._id || username}
                        username={username}
                        profileImage={img}
                        actionType="unfollow"
                        onAction={() => onUnfollow(username)}
                        loading={isLoading}
                    />
                );
            })}
        </div>
    );
};

export default FollowingList;
