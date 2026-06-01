import React from 'react';
import Avatar from '../../../components/Avatar';
import { formatPostTime } from '../../../utils/time';
import '../style/feed.scss';

const PostHeader = ({ username, profileImage, createdAt }) => {
    return (
        <div className="post-header">
            <div className="post-header-left">
                <Avatar src={profileImage} alt={username} size={36} />
                <div className="post-header-text">
                    <span className="post-username">@{username}</span>
                    <span className="post-timestamp">{formatPostTime(createdAt)}</span>
                </div>
            </div>
            <button className="btn-more-options" aria-label="More options">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                </svg>
            </button>
        </div>
    );
};

export default PostHeader;
