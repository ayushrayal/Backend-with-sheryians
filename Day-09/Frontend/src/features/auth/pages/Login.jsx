import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const { handleLogin, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (!identifier.trim()) {
            setValidationError("Username or email is required.");
            return;
        }
        if (!password) {
            setValidationError("Password is required.");
            return;
        }

        try {
            await handleLogin(identifier.trim(), password);
            navigate('/home');
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid credentials. Please try again.";
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
                            value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)} 
                            placeholder="Username or email" 
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
                        {loading ? <span className="mini-spinner"></span> : "Log In"}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">OR</span>
                    <div className="divider-line"></div>
                </div>

                <p className="auth-footer-text">
                    Don't have an account? <Link className="toggleAuthForm" to="/register">Sign Up</Link>
                </p>
            </div>
        </main>
    );
};

export default Login;