import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setSortBy } from '../store/productsSlice';
import { RootState } from '../store/store';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.products.sortBy);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value as any))}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="none">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
      </select>
    </div>
  );
};

export default SearchBar;