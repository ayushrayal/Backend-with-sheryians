import { AuthContext } from "../auth.context";
import { useContext } from "react";
export const useAuth = ()=>{
    const {user,login,register,logout,getMe,loading} = useContext(AuthContext)
    return {user,login,register,logout,getMe,loading}
}