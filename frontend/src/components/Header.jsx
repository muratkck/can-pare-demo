import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFavorites = () => {
    navigate('/register');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-20 shadow-lg">
      <div className="max-w-full flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://www.svgrepo.com/show/445600/cash-payment.svg" className="h-8" alt="can-pare Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">can-pare</span>
        </Link>
        {isLoggedIn && (
          <div className="flex items-center w-full justify-center">
            {/* Search Bar */}
            <div className="relative flex items-center justify-center w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md pl-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-3">
                <img src='/search.png' alt="Search" className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}



        {isLoggedIn && (
          <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {/* Saved Button */}
            <button onClick={handleFavorites} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">
              <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/309930/save.svg" alt="user photo" />
            </button>
            {/* Logout Button */}
            <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">
              <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/506561/sign-out.svg" alt="user photo" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
