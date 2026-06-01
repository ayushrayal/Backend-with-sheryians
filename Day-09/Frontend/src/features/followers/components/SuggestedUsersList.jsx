import React from 'react';
import UserCard from './UserCard';
import EmptyState from '../../../components/EmptyState';

const SuggestedUsersList = ({ othersProfile = [], onFollow, actionLoading = {} }) => {
    if (othersProfile.length === 0) {
        return <EmptyState title="No suggestions" message="We don't have any suggestions for you right now." />;
    }

    return (
        <div className="card-list">
            {othersProfile.map((userSuggestion) => {
                const username = userSuggestion.username;
                const img = userSuggestion.profileImage;
                const bio = userSuggestion.bio;
                const isLoading = !!actionLoading[username];

                return (
                    <UserCard 
                        key={username}
                        username={username}
                        profileImage={img}
                        bio={bio}
                        actionType="follow"
                        onAction={() => onFollow(username)}
                        loading={isLoading}
                    />
                );
            })}
        </div>
    );
};

export default SuggestedUsersList;
