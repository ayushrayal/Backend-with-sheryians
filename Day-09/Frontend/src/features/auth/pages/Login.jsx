import React,{useState} from 'react'
import axios from 'axios'
import '../styles/login.scss'
import {Link} from 'react-router'
const Login = () => {
      const [identifier, setIdentifier] = useState("");
      const [password, setPassword] = useState("");
      async function handleSubmit(e) {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                identifier,
                password
            },{
                withCredentials: true
            })
            console.log("User logged in successfully:", response.data);
        }
      catch(error){
        console.error("Error logging in user:",error);
      }}
    return (
        <main>
            <div className="form-container">
                <h2>WELCOME BACK!</h2>
                <p>Welcome back! Please enter your details.</p>
                <form>
                    <input type="text" value={identifier} onInput={(e) => setIdentifier(e.target.value)} placeholder='Enter your username or email' />
                    <input type="text" value={password} onInput={(e) => setPassword(e.target.value)} placeholder='Enter your Password' />
                    <button onClick={handleSubmit}>LOGIN</button>
                </form>
                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login