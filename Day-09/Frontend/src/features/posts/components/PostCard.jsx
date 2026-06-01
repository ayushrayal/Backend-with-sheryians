import React, { useState, useEffect, useContext } from 'react';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostFooter from './PostFooter';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import { useAuth } from '../../auth/hooks/useAuth';
import { PostContext } from '../post.context';
import '../style/feed.scss';

const PostCard = ({ post, likePost, unlikePost }) => {
    const { user: currentUser } = useAuth();
    const { deletePostContext } = useContext(PostContext);
    
    const [isSaved, setIsSaved] = useState(false);
    const [showShareToast, setShowShareToast] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    // Local state for fast responsive likes toggling
    const [localIsLiked, setLocalIsLiked] = useState(post.isliked || false);
    const [localLikesCount, setLocalLikesCount] = useState(post.likesCount || 0);

    // Sync local like state when props from post database updates
    useEffect(() => {
        setLocalIsLiked(post.isliked || false);
        setLocalLikesCount(post.likesCount || 0);
    }, [post.isliked, post.likesCount]);

    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem('saved_posts') || '[]');
        setIsSaved(savedPosts.includes(post._id));
    }, [post._id]);

    const handleLikeToggle = async () => {
        const targetState = !localIsLiked;
        setLocalIsLiked(targetState);
        setLocalLikesCount(prev => prev + (targetState ? 1 : -1));

        try {
            if (targetState) {
                await likePost(post._id);
            } else {
                await unlikePost(post._id);
            }
        } catch (err) {
            // Rollback on error
            setLocalIsLiked(!targetState);
            setLocalLikesCount(prev => prev + (targetState ? -1 : 1));
            console.error("Failed to toggle like:", err);
        }
    };

    const handleSaveToggle = () => {
        const savedPosts = JSON.parse(localStorage.getItem('saved_posts') || '[]');
        let updated;
        if (isSaved) {
            updated = savedPosts.filter(id => id !== post._id);
            setIsSaved(false);
        } else {
            updated = [...savedPosts, post._id];
            setIsSaved(true);
        }
        localStorage.setItem('saved_posts', JSON.stringify(updated));
    };

    const handleShareClick = () => {
        const url = `${window.location.origin}/post/${post._id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                setShowShareToast(true);
                setTimeout(() => setShowShareToast(false), 2000);
            })
            .catch(err => {
                console.error("Could not copy URL:", err);
            });
    };

    const handleDeleteConfirm = async () => {
        setDeleteError("");
        setIsDeleting(true);
        try {
            await deletePostContext(post._id);
            setShowDeleteModal(false);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to delete post.";
            setDeleteError(msg);
        } finally {
            setIsDeleting(false);
        }
    };

    // Robust populated/new fallbacks
    const postUsername = post.userId?.username || post.username || "user";
    const postProfileImage = post.userId?.profileImage || post.profileImage || post.profileimage;
    const postImage = post.imgUrl || post.image;

    // Check if user is the post owner
    const isOwner = currentUser && (
        (post.userId?._id === currentUser._id) || 
        (post.userId === currentUser._id) ||
        (post.userId?.username === currentUser.username) ||
        (post.username === currentUser.username)
    );

    return (
        <article className="post-card">
            <PostHeader 
                username={postUsername} 
                profileImage={postProfileImage} 
                createdAt={post.createdAt} 
            />
            
            <PostImage 
                src={postImage} 
                caption={post.caption} 
            />
            
            <PostActions 
                isLiked={localIsLiked} 
                isSaved={isSaved} 
                onLikeToggle={handleLikeToggle} 
                onSaveToggle={handleSaveToggle} 
                onShareClick={handleShareClick} 
            />
            
            <PostFooter 
                username={postUsername} 
                likesCount={localLikesCount} 
                caption={post.caption} 
            />

            {isOwner && (
                <div className="post-owner-actions">
                    <button 
                        className="btn-delete-text" 
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        Delete Post
                    </button>
                </div>
            )}

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Post" width="380px">
                <div className="delete-confirm-modal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.5' }}>
                        Are you sure you want to permanently delete this post? This action cannot be undone.
                    </p>
                    {deleteError && (
                        <div className="error-text" style={{ fontSize: '0.8rem', color: '#EF4444', fontWeight: '500' }}>
                            {deleteError}
                        </div>
                    )}
                    <div className="modal-actions" style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                        <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteConfirm} loading={isDeleting}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            {showShareToast && (
                <div className="share-toast">
                    Post link copied to clipboard!
                </div>
            )}
        </article>
    );
};

export default PostCard;
