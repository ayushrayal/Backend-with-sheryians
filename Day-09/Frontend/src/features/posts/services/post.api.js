import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export const feedAllPosts = async ()=>{
    try{
        const response = await api.get("/feed")
        return response.data
    } catch (error) {
        console.error("Error fetching posts:", error)
        throw error
    }
}

export const createPost = async(imageFile, caption) =>{
    try{
    const formData = new FormData()
    formData.append("imgUrl",imageFile);
    formData.append("caption",caption)
    const response = await api.post("/", formData)
    return response.data
    }catch(err){
        throw err
    }
}