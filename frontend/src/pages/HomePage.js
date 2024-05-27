import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';


function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in local storage
    const token = localStorage.getItem('authToken');
    //console.log(token)
    if (token) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" />;
  }

   // Dummy product data
   const products = [
    { id: 1, name: 'Product 1', image: '/images.jpeg', category: 'Category 1' },
    { id: 2, name: 'Product 2', image: '/images.jpeg', category: 'Category 2' },
    { id: 3, name: 'Product 3', image: '/images.jpeg', category: 'Category 1' },
    { id: 4, name: 'Product 4', image: '/images.jpeg', category: 'Category 3' },
    { id: 5, name: 'Product 5', image: '/images.jpeg', category: 'Category 2' }
  ];

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];


  const handleCategorySelection = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts = products.filter(product =>
    (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <Header loginControl={isLoggedIn}/>
      {/* Search Bar */}
      <div className="justify-center w-1/3 container mx-auto mt-20 mb-4 pr-24 ">
        <div className="relative flex items-center justify-end">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md pl-10" // Add left padding for the search icon
          />
          <div className="absolute inset-y-0 right-0 flex items-center mr-3">
            <img src='/search.png' alt="Search" className="w-5 h-5" /> {/* Use the search icon PNG */}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-20 flex">
        {/* Category section */}
        <div className="w-1/5 bg-gray-200 h-page flex flex-col justify-between mr-5 rounded-xl">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center py-4">Categories</h2>
            {categories.map(category => (
              <div key={category} className="pl-4 mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategorySelection(category)}
                  className="mr-2 checkbox-input visually-hidden"
                />
                <label htmlFor={category} className="cursor-pointer checkbox-label">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Product cards */}
        <div className="w-full md:w-2/4">
          <div className="grid gap-8">
            {filteredProducts
            .map(product => (
              <div key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

