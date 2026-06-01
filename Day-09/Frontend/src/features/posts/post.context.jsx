import { createContext, useEffect, useState } from "react";
import { feedAllPosts, createPost as createPostApi, likePost, unlikePost, getUserPosts, deletePost } from "./services/post.api";
import { useAuth } from "../auth/hooks/useAuth";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
   const [feedPosts, setFeedPosts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [userPosts, setUserPosts] = useState([]);
   const { user } = useAuth();

   const getUserPostsContext = async () => {
      try {
         const response = await getUserPosts();
         setUserPosts(response.posts || []);
      } catch (err) {
         console.error("Error fetching user posts:", err);
      }
   };

   const getAllPosts = async () => {
      try {
         setLoading(true);
         const response = await feedAllPosts();
         setFeedPosts(response.posts || []);
         await getUserPostsContext();
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const createPost = async (imageFile, caption) => {
      try {
         setLoading(true);
         const data = await createPostApi(imageFile, caption);
         // Insert newly created post at the top of feed (optimistically/immediately)
         setFeedPosts(prev => [data.post, ...prev]);
         await getUserPostsContext();
         return data;
      } catch (err) {
         throw err;
      } finally {
         setLoading(false);
      }
   };

   const deletePostContext = async (postId) => {
      const prevFeed = [...feedPosts];
      const prevUser = [...userPosts];

      // Optimistic update
      setFeedPosts(prev => prev.filter(post => post._id !== postId));
      setUserPosts(prev => prev.filter(post => post._id !== postId));

      try {
         await deletePost(postId);
      } catch (err) {
         // Rollback state if API fails
         setFeedPosts(prevFeed);
         setUserPosts(prevUser);
         throw err;
      }
   };

   useEffect(() => {
      if (user) {
         getAllPosts();
      } else {
         setFeedPosts([]);
         setUserPosts([]);
      }
   }, [user]);

   const likePostContext = async (postID) => {
      try {
         const data = await likePost(postID);
         getAllPosts();
         return data;
      } catch (err) {
         throw err;
      }
   };

   const unlikePostContext = async (postID) => {
      try {
         const data = await unlikePost(postID);
         getAllPosts();
         return data;
      } catch (err) {
         throw err;
      }
   };

   return (
      <PostContext.Provider
         value={{
            feedPosts,
            userPosts,
            loading,
            createPost,
            deletePostContext,
            likePostContext,
            unlikePostContext,
            getUserPostsContext,
            getAllPosts
         }}
      >
         {children}
      </PostContext.Provider>
   );
};