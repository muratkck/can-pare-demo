import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { setProduct } = useProductContext();

  const handleProductClick = () => {
    setProduct(product);
    navigate('/product-page');
  };

  return (
    <div className="card-container flex flex-col h-full">
      <div className="card-content bg-white p-4 rounded shadow-lg flex flex-row h-full mb-8 relative" onClick={handleProductClick}>
        {/* Shadow Overlay */}
        <div className="absolute inset-x-0 top-0 h-2 bg-gray-200 rounded-t"></div>

        {/* Product Image */}
        <div className="w-1/3 flex items-center justify-center">
          <img src={product.productImage} alt="Product" className="object-contain w-32 h-32" />
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4">
          <h2 className="text-lg font-bold mb-2">{product.productName}</h2>
          <p className="text-sm text-gray-800"><span className='font-bold text-blue'>Price:</span> ${product.productPrice}</p>

        </div>
      </div>
    </div>
  );
};

export default Card;
