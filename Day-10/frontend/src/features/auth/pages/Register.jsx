import { useState } from "react";
import {useAuth} from "../hook/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import '../style/formPage.scss'
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {register} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await register(username, email, password);
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    }
  return (
   <main >
    <div className="register-container">   
        <h1 >Create Account</h1>
        <form className="flex flex-col gap-4">
            <input  type="text" placeholder='Username' onInput={(e)=>setUsername(e.target.value)} />
            <input  type="email" placeholder='Email' onInput={(e)=>setEmail(e.target.value)} />
            <input  type="password" placeholder='Password' onInput={(e)=>setPassword(e.target.value)} />
            <button type='submit' onClick={handleSubmit}>Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
    </div>
   </main>
  )
}

export default Register