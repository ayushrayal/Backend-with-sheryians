import { createContext, useEffect, useState } from "react";
import {feedAllPosts, createPost as createPostApi} from "./services/post.api";
export const PostContext = createContext();
export const PostProvider = ({ children }) => {
   const [feedPosts, setFeedPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const getAllPosts = async () => {
      try {
         setLoading(true);
         const response = await feedAllPosts();
         setFeedPosts(response.posts);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };

   const createPost = async (imageFile, caption) => {
      try{
         setLoading(true)
         const data = await createPostApi(imageFile, caption)
         // prepend the newly created post to the feed
         setFeedPosts([data.post, ...feedPosts])
         setLoading(false)
         return data
      }catch(err){
         setLoading(false)
         throw err
      }
   }
   useEffect(() => {
      getAllPosts();
   }, []);
   return (
      <PostContext.Provider
         value={{
            feedPosts,
             loading,
             createPost
         }}
      >
         {children}
      </PostContext.Provider>
   );
};