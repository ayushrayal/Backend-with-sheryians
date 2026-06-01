import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../followers/components/ProfileCard';
import EditProfileModal from '../followers/components/EditProfileModal';
import { useAuth } from '../auth/hooks/useAuth';
import { usePost } from '../posts/hooks/usePost';
import { useUsers } from '../followers/hooks/useUsers';
import '../followers/style/user-profile.scss';

const RightSidebar = () => {
    const { user, handleLogout, updateUserProfile } = useAuth();
    const { userPosts = [] } = usePost();
    const { followers = [], following = [] } = useUsers();
    
    const navigate = useNavigate();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <aside className="right-sidebar-profile">
            <ProfileCard 
                user={user}
                postsCount={userPosts.length}
                followersCount={followers.length}
                followingCount={following.length}
                onEditClick={() => setIsEditOpen(true)}
                onLogoutClick={onLogout}
            />

            <EditProfileModal 
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                user={user}
                onSave={updateUserProfile}
            />
        </aside>
    );
};

export default RightSidebar;
