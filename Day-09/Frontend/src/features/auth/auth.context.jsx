import { createContext, useState, useEffect } from "react";
import { login, register, getme, updateProfileApi } from "./services/auth.api.js";
export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleLogin = async (identifier, password) => {
        setLoading(true)
        try {
            const response = await login(identifier, password)
            setUser(response.user)
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await register(username, email, password)
            setUser(response.user)
        }
        catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }
    const getCurrentUser = async()=>{
        setLoading(true);
        try{
            const response = await getme()
            setUser(response.user)
        }catch(err){
            throw err
        }finally{
            setLoading(false)
        }
    }
    const handleLogout = () => {
        document.cookie = "TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null);
    };
    const updateUserProfile = async (data) => {
        setLoading(true);
        try {
            const response = await updateProfileApi(data);
            setUser(response.user);
            return response;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCurrentUser().catch((err) => {
            console.log("Session initialization failed or no active session:", err.message);
        });
    }, []);
    return(

        <AuthContext.Provider value={{user,loading,handleLogin,handleRegister,getCurrentUser,handleLogout,updateUserProfile}}>
            {children}
        </AuthContext.Provider>
    )

}