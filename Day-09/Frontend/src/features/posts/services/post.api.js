import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const feedAllPosts = async ()=>{
    try{
        const response = await api.get("/posts/feed")
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
    const response = await api.post("/posts", formData)
    return response.data
    }catch(err){
        throw err
    }
}

export const likePost = async(postID) =>{
    try{
        const response = await api.post(`/like/${postID}`)
        return response.data
    }catch(err){
        throw err
    }   
}

export const unlikePost = async(postID) =>{
    try{
        const response = await api.post(`/unlike/${postID}`)
        return response.data
    }catch(err){
        throw err
    }   
}

export const getUserPosts = async () => {
    try {
        const response = await api.get("/posts")
        return response.data
    } catch(err) {
        throw err
    }
}

export const deletePost = async (postId) => {
    try {
        const response = await api.delete(`/posts/${postId}`)
        return response.data
    } catch(err) {
        throw err
    }
}