import Header from '../components/Header';

const ProductPage = () => {

  return (
    <div>
        <Header/>
        <div className="container mx-auto mt-8">
        <div className="bg-white p-8 rounded-lg shadow-md flex items-center">
            {/* Product Image */}
            <div className="mr-4">
            <img src='./images.jpeg' alt='Iphone 13' className="h-250 w-100 rounded-lg" />
            </div>
            
            {/* Product Details */}
            <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">İphone 13</h2>
            </div>
                <div className="text-gray-600">
                    Category 1
                </div>
            <div className="mb-4">
                <p className="text-gray-700">Product Details</p>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-gray-600">Price: 100₺</span>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add to Cart</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ProductPage;
