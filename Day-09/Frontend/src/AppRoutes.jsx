import { BrowserRouter, Routes, Route } from 'react-router'
import Login  from "./features/auth/pages/Login"
import { useAuth } from './features/auth/hooks/useAuth'
import React from 'react'
import Register from './features/auth/pages/Register'
import Profile from './features/auth/pages/Profile'
import Feed from './features/posts/pages/Feed'
const AppRoutes = () => {
    const {user} = useAuth()
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/' element={<Feed/>}/>
            </Routes>
        </BrowserRouter>)
}

export default AppRoutes