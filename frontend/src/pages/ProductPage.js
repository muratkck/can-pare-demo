import React from 'react';
import Header from '../components/Header';
import { useProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const { productData } = useProductContext();

  if (!productData) {
    return <div>No product data found</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-44">
        <div className="bg-white p-8 rounded-lg shadow-md flex items-center">
          {/* Product Image */}
          <div className="mr-4">
            <img
              src={productData.productImage}
              alt={productData.productName}
              className="h-450 w-100 rounded-lg"
              style={{ maxHeight: '200px' }} // Adjust the maxHeight as needed
            />
          </div>
          
          {/* Product Details */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{productData.productName}</h2>
            </div>
            <div className="text-gray-600">
              Category 1 {/* Replace with actual category */}
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Product Details</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Price: {productData.productPrice}</span>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
