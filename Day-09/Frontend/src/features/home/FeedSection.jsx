import React from 'react';
import Navbar from '../posts/components/Navbar';
import CreatePostCard from '../posts/components/CreatePostCard';
import PostCard from '../posts/components/PostCard';
import { usePost } from '../posts/hooks/usePost';
import { useAuth } from '../auth/hooks/useAuth';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import '../posts/style/feed.scss';

const FeedSection = () => {
    const { feedPosts = [], loading, likePostContext, unlikePostContext, createPost } = usePost();
    const { user } = useAuth();

    return (
        <div className="feed-page">
            <Navbar />
            
            <div className="feed-container">
                <CreatePostCard 
                    currentUser={user}
                    onCreatePost={createPost}
                />

                {loading && feedPosts.length === 0 ? (
                    <Loader text="Loading your timeline..." />
                ) : (
                    <div className="feed-posts">
                        {feedPosts.length === 0 ? (
                            <EmptyState 
                                title="Your Feed is Empty" 
                                message="Follow other accounts on the left sidebar to see their posts, or publish a new post!"
                            />
                        ) : (
                            feedPosts.map((post) => (
                                <PostCard 
                                    key={post._id}
                                    post={post}
                                    likePost={likePostContext}
                                    unlikePost={unlikePostContext}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedSection;
