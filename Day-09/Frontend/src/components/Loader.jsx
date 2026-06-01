import React from 'react';
import './shared.scss';

const Loader = ({ fullscreen = false, text = "Loading social feed..." }) => {
    return (
        <div className={`shared-loader ${fullscreen ? 'loader-fullscreen' : ''}`}>
            <div className="loader-ring"></div>
            {text && <span className="loader-text">{text}</span>}
        </div>
    );
};

export default Loader;
