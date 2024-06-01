import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import axios from 'axios';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search/${query}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div>
      <Header handleSearch={handleSearch} />

      <div className="container mx-auto mt-44 flex items-center justify-center" style={{ minHeight: '100vh'}}>
        <div className="w-full md:w-2/3 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div key={index}>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
