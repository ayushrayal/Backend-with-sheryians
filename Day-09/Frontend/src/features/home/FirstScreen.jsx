import React from 'react'
import Register from '../auth/pages/Register'
import { useNavigate } from 'react-router-dom'
import './style/firstscreen.scss'
const FirstScreen = () => {
  const navigate = useNavigate()
  return (
    <main className='first-screen'>
      <h1>Welcome to our social media app!</h1>
      <p>Connect with friends, share your thoughts, and explore the world around you.</p>
      <p>Join us today and start sharing your moments!</p>
      <button className='btn' onClick={() => navigate('/register')}>Get Started</button>
    </main>
  )
}

export default FirstScreen