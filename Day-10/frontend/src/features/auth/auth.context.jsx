import{handleLogin,handleRegister,handleLogout,handleGetme} from "./services/auth.service.js";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(false);

    const register = async(username,email,password)=>{
        try{
            setLoading(true)
            const response = await handleRegister(username,email,password)
            return response
            setLoading(false)
        }catch(err){
            console.error("Registration failed:", err.response?.data?.message || err.message);
            throw err
        }
    }

    const login = async (identifier,password)=>{
        try{
            setLoading(true)
            const response = await handleLogin(identifier,password)
            setUser(response.data)
            setLoading(false)
        }catch(err){
            console.error("Login failed:", err.response?.data?.message || err.message);
            throw err;
        }
    }

    const getMe = async()=>{
        try{
            setLoading(true)
            const response = await handleGetme()
            setUser(response.data)
            setLoading(false)
        }catch(err){
            console.error("GetMe failed:", err.response?.data?.message || err.message);
            throw err
        }
    }

    const logout = async()=>{
        try{
            setLoading(true)
            const response = await handleLogout()
            setUser(null)
            setLoading(false)
        } catch(err){
            console.error("Logout failed:", err.response?.data?.message || err.message);
            throw err;
        }
    }
    return (
        <AuthContext.Provider value={{ user, login, register, logout, getMe, loading }}>
            {children}
        </AuthContext.Provider>
    )
}