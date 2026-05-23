import { createContext, useEffect, useState } from "react";
import {feedAllPosts } from "./services/post.api";
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
   useEffect(() => {
      getAllPosts();
   }, []);
   return (
      <PostContext.Provider
         value={{
            feedPosts,
             loading
         }}
      >
         {children}
      </PostContext.Provider>
   );
};