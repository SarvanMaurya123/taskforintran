'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaHome, FaSignOutAlt, FaBars, FaTimes, FaClipboardList, FaChartLine, FaHandshake, FaTasks } from 'react-icons/fa';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);  // Cleanup on component unmount
        };
    }, []);

    const navItems = [
        { name: 'Home', icon: <FaHome />, path: '/' },
        { name: 'Orders', icon: <FaClipboardList />, path: '/pages/orderlist' },
        { name: 'Dashboard', icon: <FaChartLine />, path: '/pages/dashboard' },
        { name: 'Partners', icon: <FaHandshake />, path: '/pages/partnerslist' },
        { name: 'Assignment', icon: <FaTasks />, path: '/pages/assignmenthistory' },
    ];

    return (
        <div className="relative">
            <button
                className="absolute top-5 left-5 text-gray-700 text-3xl z-50 bg-gradient-to-r from-indigo-600 to-purple-500 p-2 rounded-full shadow-md hover:bg-indigo-500 transition-transform duration-300"
                onClick={toggleSidebar}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
                {isOpen ? <FaTimes className="text-white" /> : <FaBars className="text-white" />}
            </button>

            <aside className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white w-64 p-6 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:w-64`}>
                <div className="flex items-center justify-between py-4 border-b border-gray-700">
                    <h1 className="text-3xl font-semibold text-purple-400 ml-10">&#60;SM/&#62;</h1>
                    <button className="text-gray-400 hover:text-purple-400 transition duration-300" onClick={toggleSidebar} aria-label="Close sidebar">
                        <FaTimes />
                    </button>
                </div>

                <nav className="flex-1 mt-10 space-y-6">
                    <ul className="space-y-5">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link href={item.path} onClick={toggleSidebar} className="flex items-center space-x-4 px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300 text-lg hover:shadow-lg">
                                    <span className="text-xl text-purple-400">{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                className="flex items-center w-full space-x-4 px-6 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition-colors duration-300 text-lg hover:shadow-lg mb-5"
                                onClick={() => {
                                    // Logout logic here
                                    toggleSidebar();
                                }}
                                aria-label="Logout"
                            >
                                <FaSignOutAlt className="text-xl" />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className="mt-auto text-center py-4 border-t border-gray-700 mt-5">
                    <p className="text-sm text-gray-500">© 2024 Your Company</p>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed bg-black opacity-50 z-40"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                ></div>
            )}
        </div>
    );
}
