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
    id: 1, name: 'Shirts', slug: 'shirts', emoji: '👕', bg: '#f4f4f4', color: '#525252',
    description: 'T-Shirts, Polo Shirts, Casual Shirts and Long Sleeve Shirts',
    parentId: null, products: 8, status: 'active', createdAt: '2025-11-04',
  },
  {
    id: 2, name: 'Pants', slug: 'pants', emoji: '👖', bg: '#f2f2f2', color: '#404040',
    description: 'Jeans, Cargo Pants, Casual Pants and Shorts',
    parentId: null, products: 6, status: 'active', createdAt: '2025-11-18',
  },
  {
    id: 3, name: 'Shoes', slug: 'shoes', emoji: '👟', bg: '#f5f5f5', color: '#404040',
    description: 'Sneakers, Casual Shoes, Sandals and Sports Shoes',
    parentId: null, products: 4, status: 'active', createdAt: '2025-12-02',
  },
  {
    id: 4, name: 'T-Shirts', slug: 't-shirts', emoji: '👕', bg: '#f4f4f4', color: '#737373',
    description: 'Classic and graphic t-shirts for everyday wear',
    parentId: 1, products: 4, status: 'active', createdAt: '2025-12-20',
  },
  {
    id: 5, name: 'Polo Shirts', slug: 'polo-shirts', emoji: '👔', bg: '#eeeeee', color: '#0a0a0a',
    description: 'Smart casual polo shirts',
    parentId: 1, products: 1, status: 'active', createdAt: '2026-01-09',
  },
  {
    id: 6, name: 'Casual Shirts', slug: 'casual-shirts', emoji: '👔', bg: '#e8e8e8', color: '#171717',
    description: 'Relaxed casual shirts for everyday style',
    parentId: 1, products: 2, status: 'active', createdAt: '2026-01-27',
  },
  {
    id: 7, name: 'Long Sleeve Shirts', slug: 'long-sleeve-shirts', emoji: '👕', bg: '#f0f0f0', color: '#737373',
    description: 'Long sleeve shirts for cooler weather',
    parentId: 1, products: 2, status: 'active', createdAt: '2026-02-14',
  },
  {
    id: 8, name: 'Jeans', slug: 'jeans', emoji: '👖', bg: '#f0f0f0', color: '#0a0a0a',
    description: 'Classic and slim fit denim jeans',
    parentId: 2, products: 1, status: 'active', createdAt: '2026-03-03',
  },
  {
    id: 9, name: 'Cargo Pants', slug: 'cargo-pants', emoji: '👖', bg: '#f4f4f4', color: '#525252',
    description: 'Utility cargo pants with multiple pockets',
    parentId: 2, products: 1, status: 'active', createdAt: '2026-03-10',
  },
  {
    id: 10, name: 'Casual Pants', slug: 'casual-pants', emoji: '👖', bg: '#f2f2f2', color: '#404040',
    description: 'Chinos and casual trousers',
    parentId: 2, products: 1, status: 'active', createdAt: '2026-03-17',
  },
  {
    id: 11, name: 'Shorts', slug: 'shorts', emoji: '🩳', bg: '#f5f5f5', color: '#404040',
    description: 'Summer and athletic shorts',
    parentId: 2, products: 2, status: 'active', createdAt: '2026-03-24',
  },
  {
    id: 12, name: 'Sneakers', slug: 'sneakers', emoji: '👟', bg: '#f4f4f4', color: '#737373',
    description: 'Running and lifestyle sneakers',
    parentId: 3, products: 2, status: 'active', createdAt: '2026-04-01',
  },
  {
    id: 13, name: 'Casual Shoes', slug: 'casual-shoes', emoji: '👞', bg: '#eeeeee', color: '#0a0a0a',
    description: 'Canvas and oxford casual shoes',
    parentId: 3, products: 2, status: 'active', createdAt: '2026-04-08',
  },
  {
    id: 14, name: 'Sandals', slug: 'sandals', emoji: '🩴', bg: '#e8e8e8', color: '#171717',
    description: 'Leather and sport sandals',
    parentId: 3, products: 1, status: 'active', createdAt: '2026-04-15',
  },
  {
    id: 15, name: 'Sports Shoes', slug: 'sports-shoes', emoji: '👟', bg: '#f0f0f0', color: '#737373',
    description: 'Performance sports and running shoes',
    parentId: 3, products: 1, status: 'active', createdAt: '2026-04-22',
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
