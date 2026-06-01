import React from 'react';
import AppLayout from './AppLayout';
import LeftSidebar from './LeftSidebar';
import FeedSection from './FeedSection';
import RightSidebar from './RightSidebar';

const Home = () => {
    return (
        <AppLayout 
            left={<LeftSidebar />}
            center={<FeedSection />}
            right={<RightSidebar />}
        />
    );
};

export default Home;
