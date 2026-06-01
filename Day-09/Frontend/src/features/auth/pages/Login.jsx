import React,{useState} from 'react'
import { useAuth } from '../hooks/useAuth'
import '../styles/login.scss'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
      const [identifier, setIdentifier] = useState("");
      const [password, setPassword] = useState("");
      const {handleLogin,loading} = useAuth()
      const navgigate = useNavigate()
       if(loading){
          return (<main><h1>Loading...</h1></main>)
        }
      async function handleSubmit(e) {
        e.preventDefault();
        
        handleLogin(identifier,password)
        .then(() => {
            navgigate('/home')
        })
           
       }
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