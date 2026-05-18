import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        username,
        email,  
        password},{
          withCredentials: true
        })
        console.log('User registered successfully:', response.data);
      } catch (error) {
        console.error('Error registering user:', error);
      }}
  return (
    <main>
      <div className="form-container">
        <h2>Create Account</h2>
        <p>Please enter your details to create an account.</p>
        <form>
          <input type="text" value={username} onInput={
            (e) => {
              setUsername(e.target.value)
            }
          } name='username' placeholder='Enter your username' />
          <input type="text" value={email} onInput={
            (e) => {
              setEmail(e.target.value)
            }} name='email' placeholder='Enter your email' />
          <input type="text" value={password} onInput={
            (e) => {
              setPassword(e.target.value)
            }}
            name='password' placeholder='Enter your Password' />
          <button onClick={handleSubmit}>CREATE ACCOUNT</button>
        </form>
        <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register