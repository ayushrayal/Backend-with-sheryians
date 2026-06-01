import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.scss';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const { handleRegister, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (!username.trim()) {
            setValidationError("Username is required.");
            return;
        }
        if (!email.trim() || !email.includes("@")) {
            setValidationError("Please enter a valid email address.");
            return;
        }
        if (!password || password.length < 6) {
            setValidationError("Password must be at least 6 characters.");
            return;
        }

        try {
            await handleRegister(username.trim(), email.trim(), password);
            navigate('/home');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Failed to create account. Username/Email might be taken.";
            setValidationError(errorMsg);
        }
    };

    return (
        <main className="auth-main-wrapper">
            <div className="auth-card-container">
                <div className="auth-brand-header">
                    <h1 className="connectly-brand-logo">Connectly</h1>
                    <p className="brand-subtitle">Connect. Share. Grow.</p>
                </div>

                {validationError && (
                    <div className="auth-error-banner" role="alert">
                        <span>{validationError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="Username" 
                            className="auth-input-field"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email address" 
                            className="auth-input-field"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Password" 
                            className="auth-input-field"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-auth-submit" disabled={loading}>
                        {loading ? <span className="mini-spinner"></span> : "Sign Up"}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">OR</span>
                    <div className="divider-line"></div>
                </div>

                <p className="auth-footer-text">
                    Have an account? <Link className="toggleAuthForm" to="/login">Log In</Link>
                </p>
            </div>
        </main>
    );
};

export default Register;