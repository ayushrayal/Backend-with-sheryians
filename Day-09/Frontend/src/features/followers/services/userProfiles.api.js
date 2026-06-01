import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const getFollowers = async () =>{
    try{
        const response = await api.get("/followers")
        return response.data
    }catch(err){
        throw err
    }
}

export const getFollowing = async () =>{
    try{
        const response = await api.get("/following")
        return response.data
    }catch(err){
        throw err
    }
}
export const getOthersProfile = async (username) =>{
    try{
        const response = await api.get('/others-profile')
        return response.data
    }catch(err){
        throw err   
    }
}

