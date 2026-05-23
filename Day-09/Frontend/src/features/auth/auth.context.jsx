import { createContext, useState, useEffect } from "react";
import { login, register, getme } from "./services/auth.api.js";
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
    return(

        <AuthContext.Provider value={{user,loading,handleLogin,handleRegister,getCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )

}