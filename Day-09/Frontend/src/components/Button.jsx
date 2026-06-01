import React from 'react';
import './shared.scss';

const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    variant = "primary", 
    disabled = false, 
    loading = false, 
    className = "",
    icon = null 
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`shared-btn btn-${variant} ${className}`}
        >
            {loading && <span className="btn-spinner"></span>}
            {!loading && icon && <span className="btn-icon">{icon}</span>}
            <span className="btn-content">{children}</span>
        </button>
    );
};

export default Button;
