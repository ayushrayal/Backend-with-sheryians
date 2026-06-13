import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/api/auth",
    withCredentials:true
})

export const handleRegister = async (username,email,password)=>{
    try{
        
        const response = await api.post("/register",{
            username,email,password
        })
        return response
    }catch(err){
        throw err
    }
}

export const handleLogin =async (identifier,password)=>{
    try{
        const response = await api.post("/login",{
            identifier,password
        })
        return response
    }catch(err){
        throw err;
    }
}

export const handleGetme = async()=>{
    try{
        const response = await api.get("/getme")
        return response
    }catch(err){
        console.error("GetMe failed:", err.response?.data?.message || err.message);
        throw err
    }
}

export const handleLogout = async()=>{
    try{
        const response = await api.post("/logout")
        return response
    }catch(err){
        throw err;
    }   
}