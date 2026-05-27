import { BrowserRouter, Routes, Route } from 'react-router'
import Login  from "./features/auth/pages/Login"
import { useAuth } from './features/auth/hooks/useAuth'
import React from 'react'
import Register from './features/auth/pages/Register'
import Feed from './features/posts/pages/Feed'
import CreatePost from './features/posts/pages/CreatePost'
import FirstScreen from './features/home/FirstScreen'
const AppRoutes = () => {
    const {user} = useAuth()
    return (
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={<FirstScreen/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/home' element={<Feed/>}/>
                <Route path='/create-post' element={<CreatePost/>}/>
            </Routes>
        </BrowserRouter>)
}

export default AppRoutes