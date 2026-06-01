import React, { useState, useEffect } from 'react';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import ProfileImage from './ProfileImage';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && isOpen) {
            setUsername(user.username || "");
            setBio(user.bio || "");
            setProfileImage(user.profileImage || user.profileimage || "");
            setError("");
            setSuccess("");
        }
    }, [user, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        setLoading(true);
        try {
            await onSave({
                username: username.trim(),
                bio: bio.trim(),
                profileImage: profileImage.trim()
            });
            setSuccess("Profile updated successfully!");
            setTimeout(() => {
                onClose();
            }, 800);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update profile.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" width="460px">
            <form onSubmit={handleSubmit} className="modal-form">
                {error && <div className="modal-error-message">{error}</div>}
                {success && <div className="modal-success-message">{success}</div>}

                <div className="modal-preview-section">
                    <ProfileImage src={profileImage} alt="Live avatar preview" size={76} />
                    <span className="preview-label">Avatar Preview</span>
                </div>

                <div className="form-group">
                    <label htmlFor="edit-username">Username</label>
                    <input 
                        id="edit-username"
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter username"
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="edit-avatar">Profile Image URL</label>
                    <input 
                        id="edit-avatar"
                        type="text" 
                        value={profileImage} 
                        onChange={(e) => setProfileImage(e.target.value)} 
                        placeholder="Paste profile photo link"
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="edit-bio">Bio</label>
                    <textarea 
                        id="edit-bio"
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        placeholder="Add some details about yourself"
                        className="form-input text-area"
                        rows="3"
                    />
                </div>

                <div className="modal-actions">
                    <Button 
                        variant="outline" 
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="primary"
                        loading={loading}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProfileModal;
