import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import Navbar from '../components/Navbar';
import '../style/createPost.scss';

const CreatePost = () => {
    const { createPost } = usePost();
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

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
            setError("Please upload an image for your post.");
            return;
        }

        setLoading(true);
        try {
            await createPost(selectedFile, caption);
            navigate('/home');
        } catch (err) {
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-post-page-wrapper">
            <Navbar />
            <main className="create-post-main">
                <div className="create-card">
                    <header className="create-card-header">
                        <h2>Create New Post</h2>
                        {error && <div className="error-alert">{error}</div>}
                    </header>

                    <form onSubmit={handleSubmit} className="create-form">
                        <div className="media-upload-section">
                            {imagePreview ? (
                                <div className="preview-holder">
                                    <img src={imagePreview} alt="Selected preview" className="uploaded-preview-img" />
                                    <button 
                                        type="button" 
                                        className="btn-clear-media" 
                                        onClick={() => { setSelectedFile(null); setImagePreview(null); }}
                                    >
                                        ✕ Change Image
                                    </button>
                                </div>
                            ) : (
                                <div 
                                    className="upload-dropzone" 
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    <h3>Choose a photo</h3>
                                    <p>Click to browse from your device</p>
                                </div>
                            )}

                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="image/*"
                                style={{ display: 'none' }}
                                required
                            />
                        </div>

                        <div className="details-section">
                            <div className="form-group">
                                <label htmlFor="create-caption">Write a caption</label>
                                <textarea 
                                    id="create-caption"
                                    value={caption} 
                                    onChange={(e) => setCaption(e.target.value)} 
                                    placeholder="Write something creative..."
                                    className="create-textarea"
                                    rows="4"
                                />
                            </div>

                            <div className="create-actions">
                                <button 
                                    type="button" 
                                    className="btn-cancel-post" 
                                    onClick={() => navigate('/home')}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn-submit-post"
                                    disabled={loading}
                                >
                                    {loading ? <span className="mini-spinner"></span> : "Share Post"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreatePost;