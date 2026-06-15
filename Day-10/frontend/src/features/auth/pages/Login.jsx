import React,{useState} from 'react'
import {useAuth} from '../hook/useAuth'
import { useNavigate } from 'react-router'
import toast from "react-hot-toast";
import '../style/formPage.scss'
const Login = () => {
    const [identifier,setIdentifier] = useState('')
    const [password,setPassword] = useState('')
    const { login, loading } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(loading) {
            return <main>Loading...</main>
        };
            await login(identifier, password)
            toast.success("Login successful");
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)
            toast.error(error.response?.data?.message || 'Login failed. Please try again.')
        }
    }
  return (
   <main className='main' >
    <div className="login-container">
        <h1>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder='Username & Email' 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
                type="password" 
                placeholder='Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
   </main>
  )
}

export default Login