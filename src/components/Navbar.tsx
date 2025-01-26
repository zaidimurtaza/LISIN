import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notificationAPI } from '../services/api/notifications';
import { Bell, Music, LogOut, User, Plus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Logo from '../assets/Lisin2.jpg';

interface Notification {
  id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}

const fetchNotifications = async () => {
  try {
    const response = await notificationAPI.getNotifications();
    return response.data;
  } catch (error) {
    toast.error('Failed to load notifications');
    throw error;
  }
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<Notification[]>([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

 

  useEffect(() => {

    const loadNotifications = async () => {

      try {
        const data = await fetchNotifications();
        setNotifications(data);
        setUnreadNotifications(data.filter((n: Notification) => !n.is_read));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    
  };

    loadNotifications();

    const intervalId = setInterval(() => {
      if (isAuthenticated) {
        loadNotifications();
      } 
    }, 12000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);
  
  // Added aria-label for better accessibility
  return (
    <nav className="bg-black shadow-md text-white -mb-5">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-1">
            <img src={Logo} alt="Lisin Logo" className="h-20 w-20 pt-1 text-indigo-600" />
            {/* <Logo className="h-7 w-7 text-indigo-600" /> */}
            {/* <span className="text-xl font-semibold text-white">Lisin</span> */}
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-song"
                  className="flex items-center space-x-1 text-white hover:text-indigo-600 transition-colors"
                  aria-label="Upload Song"
                >
                  <Plus className="h-5 w-5" />
                  <span>Upload</span>
                </Link>

                <div className="relative">
                  <Link
                    to="/notifications"
                    className="text-white hover:text-indigo-600 transition-colors relative"
                    aria-label="Notifications"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications.length > 0 && (
                      <span 
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 animate-pulse"
                        aria-label={`${unreadNotifications.length} unread notifications`}
                      >
                        {unreadNotifications.length}
                      </span>
                    )}
                  </Link>
                </div>

                <Link
                  to={`/search/`}
                  className="text-white hover:text-indigo-600 transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Link>

                <div className="relative pt-1">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="text-white hover:text-indigo-600 transition-colors"
                    aria-label="Profile Menu"
                  >
                    <User className="h-5 w-5" />
                  </button>

                  {isProfileMenuOpen && (
                    <div 
                      className="absolute top-10 right-0 mt-2 bg-white px-0 text-black rounded-md shadow-lg w-32 z-50 transition-all duration-300 ease-in-out"
                      aria-label="Profile Menu Options"
                    >
                      <Link
                        to={`/profile/${user?.username}`}
                        className="block px-4 py-2 hover:bg-indigo-600 hover:text-white"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        View Profile
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;