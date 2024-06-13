import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-grow">
                <Navbar />
                <div className="p-4 flex-grow overflow-auto scrollbar-hide whitespace-nowrap">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;
