// Card.jsx

import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';


const Card = ({ product }) => {
  const navigate = useNavigate();
  const { setProduct } = useProductContext();

  const handleProductClick = () => {
    setProduct(product);
    navigate('/product-page');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white p-4 rounded shadow-lg flex flex-row h-full" onClick={handleProductClick}>
        {/* Product Image */}
        <div className="w-1/3">
          <img src={product.productImage} alt="Product" className="w-full h-auto max-h-40" />
        </div>
        
        {/* Product Details */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-2">{product.productName}</h2>
          <p className="text-sm text-gray-600 mb-2">Category: xxxxxxxxxxxxxxxxxxxxx</p>
          <p className="text-sm text-gray-800">{product.productPrice}</p>
          <p className="text-sm text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit vestibulum magna, sit amet rutrum dolor viverra sed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
