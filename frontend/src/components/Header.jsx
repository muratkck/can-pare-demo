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
        
          {isLoggedIn && (
            <div className='flex items-center space-x-1'>
              <div>
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <img src="https://www.svgrepo.com/show/309930/save.svg" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left h-12' alt="save" />
                </Link>
              </div>
              <div>
                <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left">
                  
                  <img className="w-8 h-8 rounded-full" src="https://www.svgrepo.com/show/506561/sign-out.svg" alt="user photo" />
                </button>
            </div>
          </div>
          )}

      </div>
      </div>
    </nav>
  );
};

export default Header;
