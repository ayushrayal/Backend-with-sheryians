import React from 'react';
import './shared.scss';

const Avatar = ({ src, alt = "User avatar", size = 40, ring = false, className = "" }) => {
    const defaultAvatar = "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
    const avatarUrl = src || defaultAvatar;

    // Split initials for a neat fallback if the url is completely empty and no image loaded
    const getInitials = (text) => {
        if (!text) return "?";
        const parts = text.split(/[_\-\s.@]+/);
        return parts.slice(0, 2).map(p => p[0]).join("").toUpperCase();
    };

    const handleImgError = (e) => {
        e.target.src = defaultAvatar;
    };

    return (
        <div 
            className={`shared-avatar ${ring ? 'avatar-ring' : ''} ${className}`}
            style={{ width: size, height: size }}
        >
            <img 
                src={avatarUrl} 
                alt={alt} 
                className="avatar-img"
                onError={handleImgError}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

export default Avatar;
