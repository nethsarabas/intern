import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../types/product';

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchTerm: string;
  sortBy: 'none' | 'price-asc' | 'price-desc' | 'rating-desc';
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  sortBy: 'none',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredItems = filterAndSortProducts(state);
    },
    setSortBy: (state, action: PayloadAction<ProductsState['sortBy']>) => {
      state.sortBy = action.payload;
      state.filteredItems = filterAndSortProducts(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = filterAndSortProducts(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

const filterAndSortProducts = (state: ProductsState): Product[] => {
  let result = [...state.items];
  
  // Apply search filter
  if (state.searchTerm) {
    result = result.filter(product =>
      product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Apply sorting
  switch (state.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      result.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
  }
  
  return result;
};

export const { setSearchTerm, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;