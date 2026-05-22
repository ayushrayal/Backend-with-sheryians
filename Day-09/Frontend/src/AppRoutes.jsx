import { BrowserRouter, Routes, Route } from 'react-router'
import Login  from "./features/auth/pages/Login"
import { useAuth } from './features/auth/hooks/useAuth'
import React from 'react'
import Register from './features/auth/pages/Register'
import Profile from './features/auth/pages/Profile'

const AppRoutes = () => {
    const {user} = useAuth()
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Welcome{user ? `, ${user.username}` : ''}</h1>}/>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </BrowserRouter>)
}

export default AppRoutes