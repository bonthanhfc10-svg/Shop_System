import { useState, useMemo } from 'react';

export function useProductFilters(initialCategory = 'ALL') {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState('featured');
  const [filters, setFilters] = useState({
    size: '',
    color: '',
    price: '',
    brand: '',
    rating: '',
  });
  const [saleOnly, setSaleOnly] = useState(false);

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setFilters({ size: '', color: '', price: '', brand: '', rating: '' });
    setSaleOnly(false);
    setSort('featured');
    setActiveCategory(initialCategory);
  };

  const hasFilters =
    Object.values(filters).some(Boolean) || saleOnly || activeCategory !== 'ALL';

  return {
    activeCategory,
    setActiveCategory,
    sort,
    setSort,
    filters,
    setFilter,
    saleOnly,
    setSaleOnly,
    clearAll,
    hasFilters,
  };
}

export function applyFilters(products, { activeCategory, sort, filters, saleOnly }) {
  let list = [...products];

  if (activeCategory !== 'ALL') {
    list = list.filter((p) => p.category === activeCategory);
  }
  if (saleOnly) {
    list = list.filter((p) => p.isSale);
  }
  if (filters.size) {
    list = list.filter((p) => p.sizes.includes(filters.size));
  }
  if (filters.color) {
    list = list.filter((p) => p.colors.includes(filters.color));
  }
  if (filters.brand) {
    list = list.filter((p) => p.brand === filters.brand);
  }
  if (filters.rating) {
    list = list.filter((p) => p.rating >= Number(filters.rating));
  }
  if (filters.price) {
    const [min, max] = filters.price.split('-').map(Number);
    list = list.filter((p) => {
      if (max) return p.price >= min && p.price <= max;
      return p.price >= min;
    });
  }

  switch (sort) {
    case 'newest':
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'bestselling':
      list.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'featured':
    default:
      list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
      break;
  }

  return list;
}
