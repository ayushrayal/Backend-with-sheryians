import React from 'react'
import AppRoutes from './AppRoutes'
import  '../src/style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/posts/post.context.jsx'
import { UsersProfileProvider } from './features/followers/userProfiles.context.jsx'
const App = () => {
  return (
    <PostProvider>
      <AuthProvider>
        <UsersProfileProvider>
           <AppRoutes/>
        </UsersProfileProvider>
      </AuthProvider>
    </PostProvider>
  )
}

export default App