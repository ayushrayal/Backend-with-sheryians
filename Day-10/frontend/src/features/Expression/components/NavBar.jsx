import React from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/Nav.scss";
import LogoutButton from "./LogoutButton";

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
        <nav>
            <div className="leftside">Moodify</div>
            <div className="rightside">
                <div className="userdetails">
                    <h1>{user.user.username}</h1>
                    <h5>{user.user.email}</h5>
                </div><LogoutButton /></div>

        </nav>
    );
};

export default Navbar;