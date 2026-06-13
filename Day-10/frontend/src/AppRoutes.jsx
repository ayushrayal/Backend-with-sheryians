import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/Expression/pages/FaceExpression'
const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<FaceExpression />} />  
      </Routes>
  )
}

export default AppRoutes