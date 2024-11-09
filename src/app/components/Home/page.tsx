'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';  // Import icons for hamburger menu

const Homedata = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Toggle mobile menu visibility
    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <header className="bg-slate-500 h-16 flex items-center justify-between px-4 sm:px-6 md:px-8">
                <div className="text-white text-2xl font-bold">Logo</div>

                {/* Hamburger Icon for Mobile */}
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className="text-white text-2xl">
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Navigation Menu */}
                <nav className={`lg:flex ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
                    <ul className="flex space-x-8 text-lg font-medium text-white hidden md:block">
                        <li>
                            <Link href="/components/Home/order">
                                <p className="hover:text-indigo-300 transition-colors duration-300 text-center">Order Please</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/partners">
                                <p className="hover:text-indigo-300 transition-colors duration-300 text-center">Partners</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/assignments">
                                <p className="hover:text-indigo-300 transition-colors duration-300 text-center">Assignments</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/assignmentmatiral">
                                <p className="hover:text-indigo-300 transition-colors duration-300 text-center">AssignmentsMatiral</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            {/* Mobile Menu (for smaller screens) */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-slate-500 text-white px-4 py-2">
                    <ul className="space-y-4 text-lg font-medium">
                        <li>
                            <Link href="/components/Home/order">
                                <p className="hover:text-indigo-300 transition-colors duration-300">Order Please</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/partners">
                                <p className="hover:text-indigo-300 transition-colors duration-300">Partners</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/assignments">
                                <p className="hover:text-indigo-300 transition-colors duration-300">Assignments</p>
                            </Link>
                        </li>
                        <li>
                            <Link href="/components/Home/assignmentmatiral">
                                <p className="hover:text-indigo-300 transition-colors duration-300">AssignmentsMatiral</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Homedata;
