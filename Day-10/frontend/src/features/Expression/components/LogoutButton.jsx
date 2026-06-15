import React from 'react'
import { useAuth } from '../../auth/hook/useAuth'
import {useNavigate }from 'react-router'
import toast from "react-hot-toast";
import "../style/button.scss"
const LogoutButton = () => {
    const { logout } = useAuth();
        const navigate = useNavigate();
    const handleLogout =async () => {
        try{
            await logout();
            toast.success("Logged out successfully");
        navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || "Error occurred while logging out. Please try again.");
        }
    }
  return (
    <button className="logoutButton" onClick={handleLogout}>
      logout
    </button>
  )
}

export default LogoutButton