import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownButtonRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
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
      const userEmail = localStorage.getItem('userEmail');
      axios.get(`http://localhost:5000/api/users/${userEmail}`)
        .then(response => setUser(response.data))
        .catch(err => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  console.log(user)

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-20 shadow-lg">
      <div className="max-w-full flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://www.svgrepo.com/show/445600/cash-payment.svg" className="h-8" alt="can-pare Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">can-pare</span>
        </Link>
        {isLoggedIn && (
          <div className="flex items-center w-full justify-center">
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
            <button onClick={handleFavorites} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">
              <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/309930/save.svg" alt="user photo" />
            </button>
            <button
              ref={dropdownButtonRef}
              onClick={toggleDropdown}
              type="button"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="profile-circle-svgrepo-com.svg" alt="user photo" />
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-4 w-48 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                style={{
                  top: dropdownButtonRef.current ? dropdownButtonRef.current.getBoundingClientRect().bottom : 'auto',
                }}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{user.name } {user.surname}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">

                  <li>
                    <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">Sign out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
