import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { fetchProducts } from './store/productsSlice';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import { ShoppingBag } from 'lucide-react';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Product Catalog</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar />
        <ProductGrid />
      </main>
    </div>
  );
}

export default App;