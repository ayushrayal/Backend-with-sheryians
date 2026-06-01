import React from 'react';
import ProfileImage from './ProfileImage';
import ProfileStats from './ProfileStats';
import Button from '../../../components/Button';
import '../style/user-profile.scss';

const ProfileCard = ({ 
    user, 
    postsCount = 0, 
    followersCount = 0, 
    followingCount = 0, 
    onEditClick, 
    onLogoutClick 
}) => {
    if (!user) {
        return (
            <div className="profile-card-empty">
                <p>Please log in to view your profile</p>
            </div>
        );
    }

    const avatarUrl = user.profileImage || user.profileimage;

    return (
        <div className="profile-card">
            <div className="profile-banner"></div>
            <div className="profile-card-content">
                <div className="profile-avatar-wrapper">
                    <ProfileImage src={avatarUrl} alt={`${user.username}'s avatar`} size={80} />
                </div>
                
                <h2 className="profile-username">@{user.username}</h2>
                <p className="profile-email">{user.email}</p>
                
                {user.bio ? (
                    <p className="profile-bio">"{user.bio}"</p>
                ) : (
                    <p className="profile-bio-placeholder">No bio added yet</p>
                )}

                <ProfileStats 
                    postsCount={postsCount} 
                    followersCount={followersCount} 
                    followingCount={followingCount} 
                />

                <div className="profile-actions">
                    <Button variant="outline" onClick={onEditClick} className="btn-edit-profile">
                        Edit Profile
                    </Button>
                    <Button variant="danger" onClick={onLogoutClick} className="btn-logout">
                        Log Out
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
