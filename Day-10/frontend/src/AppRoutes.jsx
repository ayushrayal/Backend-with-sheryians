import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FaceExpression from './features/Expression/pages/FaceExpression'
import Protected from './features/auth/components/Protected'
const AppRoutes = () => {
  return (
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Protected><FaceExpression /></Protected>} />  
      </Routes>
  )
}

export default AppRoutes