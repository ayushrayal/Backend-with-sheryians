import React from 'react';
import '../style/feed.scss';

const PostFooter = ({ username, likesCount = 0, caption = "" }) => {
    return (
        <div className="post-details-area">
            <span className="likes-count">
                {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
            </span>
            {caption && (
                <p className="post-caption">
                    <span className="caption-username">@{username}</span>
                    <span className="caption-text">{caption}</span>
                </p>
            )}
        </div>
    );
};

export default PostFooter;
