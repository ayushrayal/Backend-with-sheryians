import React from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/Nav.scss";

const MoodifyLogo = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="22"
        height="22"
        aria-hidden="true"
    >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </svg>
);

const getInitials = (name = "") =>
    name.slice(0, 2).toUpperCase();

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
        }
    };

    const username = user?.user?.username || "";
    const email = user?.user?.email || "";

    return (
        <nav className="navbar" aria-label="Main navigation">
            {/* Brand */}
            <div className="navbar__brand">
                <div className="navbar__logo" aria-hidden="true">
                    <MoodifyLogo />
                </div>
                <span className="navbar__name">Moodify</span>
            </div>

            {/* Center spacing */}
            <div className="navbar__spacer" />

            {/* User and Logout */}
            {username && (
                <div className="navbar__actions">
                    <div className="navbar__user">
                        <div className="navbar__avatar" aria-hidden="true" title={username}>
                            {getInitials(username)}
                        </div>
                        <div className="navbar__info">
                            <span className="navbar__username">{username}</span>
                            <span className="navbar__email">{email}</span>
                        </div>
                    </div>
                    <button
                        id="logout-btn"
                        className="navbar__logout"
                        onClick={handleLogout}
                        aria-label="Log out of Moodify"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;