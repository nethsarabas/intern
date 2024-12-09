import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'Test description',
    category: 'test',
    image: 'https://fakestoreapi.com/img/1.jpg',
    rating: {
      rate: 4.5,
      count: 120
    }
  };

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeDefined();
    expect(screen.getByText('$99.99')).toBeDefined();
    expect(screen.getByText('(120)')).toBeDefined();
    expect(screen.getByAltText('Test Product')).toBeDefined();
  });
});