import React from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import '../style/user-profile.scss';

const UserCard = ({ 
    username, 
    profileImage, 
    bio = "", 
    actionType = "follow", // 'follow' | 'unfollow' | 'follow-back' | 'none'
    onAction, 
    loading = false 
}) => {
    return (
        <div className="user-card hover-lift">
            <div className="user-card-info">
                <Avatar src={profileImage} alt={username} size={38} />
                <div className="user-details">
                    <span className="user-card-username" title={username}>{username}</span>
                    {bio && <span className="user-card-bio" title={bio}>{bio}</span>}
                </div>
            </div>
            <div className="user-card-action">
                {actionType === "follow" && (
                    <Button 
                        variant="text" 
                        onClick={onAction} 
                        loading={loading}
                    >
                        Follow
                    </Button>
                )}
                {actionType === "follow-back" && (
                    <Button 
                        variant="primary" 
                        onClick={onAction} 
                        loading={loading}
                        className="btn-sm"
                    >
                        Follow Back
                    </Button>
                )}
                {actionType === "unfollow" && (
                    <Button 
                        variant="outline" 
                        onClick={onAction} 
                        loading={loading}
                        className="btn-sm"
                    >
                        Following
                    </Button>
                )}
                {actionType === "none" && (
                    <span className="badge-following">Following</span>
                )}
            </div>
        </div>
    );
};

export default UserCard;
