"use client"

import React, {useState} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  BellIcon, 
  ChatBubbleLeftIcon, 
  UserCircleIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NavbarProps {
    toggleSideBar?: () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const router = useRouter()

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleNavigation = (path: string) => {
        router.push(path)
        setIsMobileMenuOpen(false)
    };


    return (
        <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-lg border-b border-teal-600">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Sidebar Toggle */}
                                    <button
                                      onClick={toggleSidebar}
                                      className="lg:hidden p-2 rounded-lg text-teal-100 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                                      aria-label="Toggle sidebar"
                                    >
                                      <Bars3Icon className="h-6 w-6" />
                                    </button>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Navbar;