import React from 'react';
import './style/Home.scss';

const AppLayout = ({ left, center, right }) => {
    return (
        <main className="home-layout">
            {left}
            {center}
            {right}
        </main>
    );
};

export default AppLayout;
