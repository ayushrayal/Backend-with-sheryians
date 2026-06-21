import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/auth",
    withCredentials: true
})

export const handleGetSong = async (emotion) => {
    try {
        const response = await api.get("/spotify/callback", {
            params: {
                mood: emotion
            }
        })
        return response;
    } catch (err) {
        throw err
    }
}