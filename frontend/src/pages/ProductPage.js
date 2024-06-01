import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useProductContext } from '../context/ProductContext';
import axios from 'axios';

const ProductPage = () => {
  const { productData } = useProductContext();

  if (!productData) {
    return <div className="container mx-auto mt-44 text-center">No product data found</div>;
  }

  const addToFavorites = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/favorites/add', {
        productId: productData.id  // Make sure productData has an 'id' field or adjust as needed
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assumes the token is stored in localStorage
        }
      });
      if (response.status === 200) {
        alert('Product added to favorites!');
      }
    } catch (error) {
      console.error('Failed to add product to favorites', error);
      alert('Failed to add product to favorites');
    }
  };
  
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-20 py-10" style={{ minHeight: '100vh'}}>
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center">
          {/* Product Image */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <img
              src={productData.productImage}
              alt={productData.productName}
              className="rounded-lg shadow-md"
              style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
            />
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-2/3 md:pl-8">
            <h2 className="text-3xl font-semibold mb-3">{productData.productName}</h2>
            <p className="text-lg text-gray-500 mb-1">Sold by: {productData.productSeller}</p>
            <p className="text-md text-gray-700 mb-4">{productData.productDescription}</p>
            <div className="flex flex-wrap items-center justify-start gap-4">
              <span className="text-xl font-bold text-gray-800">Price: ${productData.productPrice}</span>
              <a href={productData.productLink} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                View Product
              </a>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
                onClick={addToFavorites}
              >
                Add to Favorites
              </button>
              <a href={productData.productLink} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
