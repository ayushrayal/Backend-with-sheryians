import React from 'react';
import Avatar from '../../../components/Avatar';

const ProfileImage = ({ src, alt = "Profile image", size = 80, editable = false, onClick = null, className = "" }) => {
    return (
        <div 
            className={`profile-image-container ${editable ? 'editable' : ''} ${className}`}
            onClick={editable ? onClick : undefined}
            style={{ width: size, height: size, cursor: editable ? 'pointer' : 'default' }}
        >
            <Avatar src={src} alt={alt} size={size} />
            {editable && (
                <div className="edit-overlay">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default ProfileImage;
