export const PAGE_SIZE = 6;

export const MAIN_CATEGORY_LABEL = 'Main Category';

export const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'products-desc', label: 'Most Products' },
  { value: 'products-asc', label: 'Fewest Products' },
  { value: 'newest', label: 'Newest First' },
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'hidden', label: 'Hidden' },
];

export const initialCategories = [
  {
    id: 1, name: 'Fashion', slug: 'fashion', emoji: '👗', bg: '#fdf2f8', color: '#ec4899',
    description: 'Clothing, dresses and seasonal outfits',
    parentId: null, products: 120, status: 'active', createdAt: '2025-11-04',
  },
  {
    id: 2, name: 'Shoes', slug: 'shoes', emoji: '👟', bg: '#eff6ff', color: '#3b82f6',
    description: 'Sneakers, boots, heels and sandals',
    parentId: null, products: 85, status: 'active', createdAt: '2025-11-18',
  },
  {
    id: 3, name: 'Bags & Accessories', slug: 'bags-accessories', emoji: '👜', bg: '#fffbeb', color: '#d97706',
    description: 'Handbags, wallets and everyday carry',
    parentId: null, products: 64, status: 'active', createdAt: '2025-12-02',
  },
  {
    id: 4, name: 'Beauty', slug: 'beauty', emoji: '💄', bg: '#fdf2f8', color: '#db2777',
    description: 'Skincare, makeup and personal care',
    parentId: null, products: 45, status: 'active', createdAt: '2025-12-20',
  },
  {
    id: 5, name: 'Electronics', slug: 'electronics', emoji: '🎧', bg: '#eef2ff', color: '#6366f1',
    description: 'Audio, gadgets and smart devices',
    parentId: null, products: 78, status: 'active', createdAt: '2026-01-09',
  },
  {
    id: 6, name: 'Home & Living', slug: 'home-living', emoji: '🛋️', bg: '#ecfdf5', color: '#059669',
    description: 'Furniture, decor and kitchen essentials',
    parentId: null, products: 52, status: 'active', createdAt: '2026-01-27',
  },
  {
    id: 7, name: 'Gaming', slug: 'gaming', emoji: '🎮', bg: '#f5f3ff', color: '#8b5cf6',
    description: 'Consoles, accessories and peripherals',
    parentId: null, products: 32, status: 'active', createdAt: '2026-02-14',
  },
  {
    id: 8, name: 'Sale', slug: 'sale', emoji: '🔥', bg: '#fef2f2', color: '#dc2626',
    description: 'Discounted items and clearance deals',
    parentId: null, products: 18, status: 'hidden', createdAt: '2026-03-03',
  },
];

export function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function getCategoryStats(categories) {
  return {
    total: categories.length,
    products: categories.reduce((sum, c) => sum + (c.products || 0), 0),
    active: categories.filter((c) => c.status === 'active').length,
    hidden: categories.filter((c) => c.status === 'hidden').length,
  };
}

export function getParentLabel(categories, parentId) {
  if (parentId == null) return MAIN_CATEGORY_LABEL;
  const parent = categories.find((c) => c.id === parentId);
  return parent ? parent.name : MAIN_CATEGORY_LABEL;
}

export function filterCategories(categories, { search, statusFilter, parentFilter }) {
  const query = search.trim().toLowerCase();
  return categories.filter((category) => {
    const matchesSearch =
      !query ||
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || category.status === statusFilter;
    const matchesParent =
      parentFilter === '' ||
      (parentFilter === 'root' ? category.parentId == null : category.parentId === Number(parentFilter));
    return matchesSearch && matchesStatus && matchesParent;
  });
}

export function sortCategories(categories, sortValue) {
  const sorted = [...categories];
  switch (sortValue) {
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'products-desc':
      return sorted.sort((a, b) => b.products - a.products);
    case 'products-asc':
      return sorted.sort((a, b) => a.products - b.products);
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'name-asc':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
}
