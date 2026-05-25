import {PostContext} from "../post.context.jsx"
import {useContext} from "react"

export const usePost = ()=>{
    const {feedPosts, loading, createPost} = useContext(PostContext)
    return {feedPosts, loading, createPost}
}