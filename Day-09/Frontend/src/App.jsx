import React from 'react'
import AppRoutes from './AppRoutes'
import  '../src/style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { PostProvider } from './features/posts/post.context.jsx'
const App = () => {
  return (
    <PostProvider>
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </PostProvider>
  )
}

export default App