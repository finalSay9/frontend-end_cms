'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  BellIcon, 
  ChatBubbleLeftIcon, 
  UserCircleIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NavbarProps {
  toggleSidebar?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-lg border-b border-teal-600">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg text-teal-100 hover:text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Logo and Company Name */}
            <Link href="/hr/dashboard" className="flex items-center group">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full p-1 shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <div className="w-full h-full bg-teal-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">T</span>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold tracking-wide group-hover:text-teal-100 transition-colors duration-200">
                  TecVac
                </span>
                <div className="text-xs text-teal-200 opacity-90 hidden sm:block">
                  HR Management
                </div>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center ml-8">
              <div className={`
                flex items-center bg-teal-700/50 backdrop-blur-sm rounded-lg px-4 py-2.5 
                transition-all duration-200 border border-transparent
                ${isSearchFocused ? 'bg-white/10 border-teal-400 shadow-lg' : 'hover:bg-teal-700/70'}
              `}>
                <MagnifyingGlassIcon className="h-5 w-5 text-teal-200 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search employees, projects..."
                  className="bg-transparent text-white placeholder-teal-200 text-sm focus:outline-none w-64"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Notification */}
              <button
                onClick={() => handleNavigation('/hr/notification')}
                className="relative p-2.5 rounded-lg hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 group"
                title="Notifications"
              >
                <BellIcon className="h-6 w-6 text-teal-100 group-hover:text-white transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  3
                </span>
              </button>

              {/* Messages */}
              <button
                onClick={() => handleNavigation('/hr/messages')}
                className="relative p-2.5 rounded-lg hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 group"
                title="Messages"
              >
                <ChatBubbleLeftIcon className="h-6 w-6 text-teal-100 group-hover:text-white transition-colors duration-200" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  5
                </span>
              </button>

              {/* Profile */}
              <button
                onClick={() => handleNavigation('/hr/profile')}
                className="p-2.5 rounded-lg hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 group"
                title="Profile"
              >
                <UserCircleIcon className="h-6 w-6 text-teal-100 group-hover:text-white transition-colors duration-200" />
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-teal-600 mx-2"></div>

              {/* User Info */}
              <div className="flex items-center space-x-3 pl-2">
                <div className="text-right hidden lg:block">
                  <div className="text-sm font-medium text-white">Evan Chimwaza</div>
                  <div className="text-xs text-teal-200">HR Manager</div>
                </div>
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">EV</span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-teal-100 hover:text-white hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-teal-600" id="mobile-menu">
          <div className="px-4 pt-4 pb-6 space-y-3 bg-teal-800/95 backdrop-blur-sm">
            {/* Mobile Search */}
            <div className="flex items-center bg-teal-700/70 rounded-lg px-4 py-3 mb-4">
              <MagnifyingGlassIcon className="h-5 w-5 text-teal-200 mr-3" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-white placeholder-teal-200 text-sm focus:outline-none w-full"
              />
            </div>

            {/* Mobile Navigation Items */}
            <button
              onClick={() => handleNavigation('/hr/notification')}
              className="flex items-center w-full px-3 py-3 rounded-lg text-left font-medium hover:bg-teal-700/50 transition-colors duration-200"
            >
              <BellIcon className="h-5 w-5 mr-3 text-teal-200" />
              <span>Notifications</span>
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">3</span>
            </button>

            <button
              onClick={() => handleNavigation('/hr/messages')}
              className="flex items-center w-full px-3 py-3 rounded-lg text-left font-medium hover:bg-teal-700/50 transition-colors duration-200"
            >
              <ChatBubbleLeftIcon className="h-5 w-5 mr-3 text-teal-200" />
              <span>Messages</span>
              <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">5</span>
            </button>

            <button
              onClick={() => handleNavigation('/hr/profile')}
              className="flex items-center w-full px-3 py-3 rounded-lg text-left font-medium hover:bg-teal-700/50 transition-colors duration-200"
            >
              <UserCircleIcon className="h-5 w-5 mr-3 text-teal-200" />
              <span>Profile</span>
            </button>

            {/* Mobile User Info */}
            <div className="border-t border-teal-600 pt-4 mt-4">
              <div className="flex items-center space-x-3 px-3">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">EV</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Evan Chimwaza</div>
                  <div className="text-xs text-teal-200">HR Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;