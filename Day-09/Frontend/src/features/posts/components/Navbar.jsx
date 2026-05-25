import React from 'react'
import CreatePost from '../pages/CreatePost'
import '../style/navbar.scss'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="navbar">
         <h1>My Posts</h1>
        <button className='create-post-btn' onClick={() => navigate('/create-post')}>Create Post</button>
    </div>
  )
}

export default Navbar