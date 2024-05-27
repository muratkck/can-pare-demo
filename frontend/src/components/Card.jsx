import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <Link to= '/product-page' >
      <div className="bg-white p-4 rounded shadow-md flex items-center rounded-xl bg-slate-50">
        {/* Product Image */}
        <div className="w-1/3 pr-4">
          <img src={product.image} alt="Product" className="w-full h-auto" />
        </div>
        
        {/* Product Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
          {/*<p className="text-sm text-gray-800">{product.description}</p>*/}
          <p className="text-sm text-gray-800">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro animi inventore cupiditate corrupti neque veniam libero quam magni! Ipsam illo fugiat quis in repellendus. Aliquid minus cupiditate rerum quas facilis?
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
