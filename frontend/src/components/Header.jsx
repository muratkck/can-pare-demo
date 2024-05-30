import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = ({}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(isLoggedIn)

  const handleLogout = () => {
    // Perform logout actions like removing auth token
    localStorage.removeItem('authToken');
    // Redirect to login page
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full z-20">
      <div className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://www.svgrepo.com/show/445600/cash-payment.svg" className="h-8" alt="can-pare Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">can-pare</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
        <div>
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://www.svgrepo.com/show/309930/save.svg" className="h-8" alt="save" /> Kaydedilmiş Ürünler
        </Link>
        </div>
          {isLoggedIn && (
            <div>
              <button
                onClick={toggleDropdown}
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://iyte.edu.tr/wp-content/uploads/2019/02/iyte-logo-transparan-360px.png" alt="user photo" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">Sign out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
   
      </div>
    </nav>
  );
};

export default Header;
