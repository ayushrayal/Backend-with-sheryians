import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/navbar.scss';
import { useAuth } from '../../auth/hooks/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, handleLogout } = useAuth();

    const onLogout = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <header className="main-navbar">
            <div className="navbar-left" onClick={() => navigate('/home')}>
                <span className="navbar-logo">Connectly</span>
            </div>

            <div className="navbar-right">
                <button 
                    className={`nav-icon-btn ${location.pathname === '/home' ? 'active' : ''}`}
                    onClick={() => navigate('/home')}
                    title="Home"
                    aria-label="Home"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M12 2.1L1 12h3v9h7v-6h2v6h7v-9h3L12 2.1zm5.5 16.9H15v-6H9v6H6.5v-7.8L12 5.5l5.5 5.7v7.8z" />
                    </svg>
                </button>

                <button 
                    className={`nav-icon-btn ${location.pathname === '/create-post' ? 'active' : ''}`}
                    onClick={() => navigate('/create-post')}
                    title="New Post"
                    aria-label="New Post"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                </button>

                {user && (
                    <button 
                        className="btn-navbar-logout"
                        onClick={onLogout}
                        title="Log Out"
                        aria-label="Log Out"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;