import React from 'react';
import { Star } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative pb-[100%]">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold line-clamp-2 mb-2">{product.title}</h3>
        <div className="flex items-center mb-2">
          {renderStars(product.rating.rate)}
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating.count})
          </span>
        </div>
        <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;