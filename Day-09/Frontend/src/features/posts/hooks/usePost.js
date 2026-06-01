import {PostContext} from "../post.context.jsx"
import {useContext} from "react"

export const usePost = ()=>{
    const context = useContext(PostContext)
    return context
}