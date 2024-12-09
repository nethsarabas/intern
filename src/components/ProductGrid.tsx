import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const { filteredItems, status, error } = useSelector((state: RootState) => state.products);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-500 py-8">
        Error: {error}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;