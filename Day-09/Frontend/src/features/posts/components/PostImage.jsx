import React from 'react';
import '../style/feed.scss';

const PostImage = ({ src, caption = "Post image" }) => {
    const handleImgError = (e) => {
        // Fallback for broken image links
        e.target.src = "https://ik.imagekit.io/ayushrayal/Default.webp?updatedAt=1778609836107";
    };

    return (
        <div className="post-media-container">
            <img 
                src={src} 
                alt={caption} 
                className="post-media-img" 
                onError={handleImgError}
            />
        </div>
    );
};

export default PostImage;
