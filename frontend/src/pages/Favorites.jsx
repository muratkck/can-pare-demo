import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Header component import

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    axios.get(`http://localhost:5000/api/favorites/${userEmail}`)
      .then(response => {
        setFavorites(response.data);
      })
      .catch(err => {
        console.error('Failed to fetch favorites', err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-16">
        <div className="bg-gray-800 text-white p-4 shadow">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold">Your Favorite Products</h2>
          </div>
        </div>
        <div className="container mx-auto mt-10">
          <div className="grid grid-cols-3 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="p-4 shadow rounded-lg bg-white">
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded" />
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
