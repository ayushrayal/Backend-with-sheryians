import React, { useState, useRef } from 'react';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import '../style/feed.scss';

const CreatePostCard = ({ currentUser, onCreatePost }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!selectedFile) {
            setError("Please upload an image to share.");
            return;
        }

        setLoading(true);
        try {
            await onCreatePost(selectedFile, caption);
            setCaption("");
            setSelectedFile(null);
            setImagePreview(null);
            setIsCreating(false);
        } catch (err) {
            setError("Failed to share post. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setCaption("");
        setSelectedFile(null);
        setImagePreview(null);
        setIsCreating(false);
        setError("");
    };

    const avatarUrl = currentUser?.profileImage || currentUser?.profileimage;

    return (
        <div className="create-post-card">
            {!isCreating ? (
                <div className="create-post-trigger" onClick={() => setIsCreating(true)}>
                    <Avatar src={avatarUrl} alt="My profile pic" size={36} />
                    <div className="trigger-placeholder">
                        Share what's on your mind...
                    </div>
                    <button className="btn-add-photo" aria-label="Add photo">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="create-post-form">
                    <header className="form-header">
                        <h3>Create New Post</h3>
                        {error && <p className="error-text">{error}</p>}
                    </header>

                    <div className="form-body">
                        <textarea 
                            placeholder="Write a caption..." 
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="caption-textarea"
                            rows="3"
                        />
                        
                        {imagePreview ? (
                            <div className="preview-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button 
                                    type="button" 
                                    className="btn-remove-preview" 
                                    onClick={() => { setSelectedFile(null); setImagePreview(null); }}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <div className="upload-placeholder" onClick={() => fileInputRef.current.click()}>
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span>Select photo from computer</span>
                            </div>
                        )}

                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                    </div>

                    <footer className="form-footer">
                        <Button 
                            variant="outline" 
                            onClick={handleCancel} 
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary" 
                            loading={loading}
                        >
                            Share
                        </Button>
                    </footer>
                </form>
            )}
        </div>
    );
};

export default CreatePostCard;
