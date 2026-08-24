import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatCurrency';
import { Search, Grid, List, Star } from 'lucide-react';

const allProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, originalPrice: 99.99, stock: 124, rating: 4.5, reviews: 128, emoji: '🎧', badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.99, originalPrice: 249.99, stock: 56, rating: 4.8, reviews: 95, emoji: '⌚', badge: 'New' },
  { id: 3, name: 'USB-C Hub Adapter', category: 'Accessories', price: 34.99, originalPrice: null, stock: 230, rating: 4.3, reviews: 67, emoji: '🔌', badge: null },
  { id: 4, name: 'Laptop Stand Adjustable', category: 'Furniture', price: 45.99, originalPrice: 59.99, stock: 89, rating: 4.6, reviews: 43, emoji: '🖥️', badge: 'Sale' },
  { id: 5, name: 'Wireless Mouse Ergonomic', category: 'Electronics', price: 39.99, originalPrice: null, stock: 145, rating: 4.4, reviews: 89, emoji: '🖱️', badge: null },
  { id: 6, name: '4K Webcam HD', category: 'Electronics', price: 69.99, originalPrice: 89.99, stock: 34, rating: 4.7, reviews: 56, emoji: '📷', badge: 'Popular' },
  { id: 7, name: 'Portable SSD 1TB', category: 'Accessories', price: 99.99, originalPrice: null, stock: 67, rating: 4.9, reviews: 201, emoji: '💾', badge: 'Top Rated' },
  { id: 8, name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 89.99, originalPrice: 119.99, stock: 0, rating: 4.5, reviews: 134, emoji: '⌨️', badge: 'Sale' },
  { id: 9, name: 'Desk Lamp LED', category: 'Furniture', price: 29.99, originalPrice: null, stock: 78, rating: 4.2, reviews: 45, emoji: '💡', badge: null },
  { id: 10, name: 'Noise Cancelling Earbuds', category: 'Electronics', price: 129.99, originalPrice: 159.99, stock: 92, rating: 4.7, reviews: 178, emoji: '🎵', badge: 'New' },
  { id: 11, name: 'Webcam Tripod Stand', category: 'Accessories', price: 19.99, originalPrice: null, stock: 156, rating: 4.1, reviews: 34, emoji: '📷', badge: null },
  { id: 12, name: 'Monitor Light Bar', category: 'Electronics', price: 49.99, originalPrice: 69.99, stock: 43, rating: 4.6, reviews: 89, emoji: '💡', badge: 'Sale' },
];

const categories = ['All', 'Electronics', 'Accessories', 'Furniture'];
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

export default function Shop() {
  const { colors } = useTheme();
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState('grid');
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'Price: Low to High': result.sort((a, b) => a.price - b.price); break;
      case 'Price: High to Low': result.sort((a, b) => b.price - a.price); break;
      case 'Rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [search, category, sortBy]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px clamp(16px, 3vw, 32px)' }}>
      <div style={{
        background: '#0a0a0a',
        borderRadius: '20px', padding: 'clamp(24px, 3vw, 36px)', marginBottom: '24px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: '#fff' }}>Shop</h1>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
            Browse our collection of {allProducts.length} products
          </p>
        </div>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
      </div>

      <div style={{
        display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div style={{
          flex: '1 1 280px', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '10px 16px', borderRadius: '12px',
          background: colors.bgCard, border: `1px solid ${colors.borderInput}`,
        }}>
          <Search size={18} color={colors.textSubtle} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '14px', color: colors.text, width: '100%',
            }}
          />
        </div>

        <div className="hide-mobile" style={{ display: 'flex', gap: '6px' }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '8px 16px', borderRadius: '10px',
              background: category === c ? colors.accent : colors.bgCard,
              color: category === c ? '#fff' : colors.textSecondary,
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              border: `1px solid ${category === c ? colors.accent : colors.border}`,
              transition: 'all 0.15s',
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '9px 32px 9px 14px', borderRadius: '10px',
              background: colors.bgCard, border: `1px solid ${colors.borderInput}`,
              fontSize: '13px', color: colors.text, cursor: 'pointer', outline: 'none',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
            }}
          >
            {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px' }}>
        <button onClick={() => setViewMode('grid')} style={{
          padding: '8px 12px', borderRadius: '8px',
          background: viewMode === 'grid' ? colors.accent : colors.bgCard,
          color: viewMode === 'grid' ? '#fff' : colors.textMuted,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          border: `1px solid ${viewMode === 'grid' ? colors.accent : colors.border}`,
        }}>
          <Grid size={16} />
        </button>
        <button onClick={() => setViewMode('list')} style={{
          padding: '8px 12px', borderRadius: '8px',
          background: viewMode === 'list' ? colors.accent : colors.bgCard,
          color: viewMode === 'list' ? '#fff' : colors.textMuted,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          border: `1px solid ${viewMode === 'list' ? colors.accent : colors.border}`,
        }}>
          <List size={16} />
        </button>
        <span style={{ marginLeft: '8px', fontSize: '13px', color: colors.textMuted, alignSelf: 'center' }}>
          {filteredProducts.length} products found
        </span>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 20px',
          background: colors.bgCard, borderRadius: '16px',
          border: `1px solid ${colors.border}`,
        }}>
          <Search size={48} color={colors.textSubtle} style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.text }}>No products found</h3>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textMuted }}>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: viewMode === 'grid'
            ? 'repeat(auto-fill, minmax(240px, 1fr))'
            : '1fr',
          gap: '20px',
        }}>
          {filteredProducts.map((product) => {
            return (
              <Link key={product.id} to={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
                  overflow: 'hidden', transition: 'all 0.3s',
                  display: viewMode === 'list' ? 'flex' : 'block',
                  cursor: 'pointer',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = colors.shadowLg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    width: viewMode === 'list' ? '160px' : '100%',
                    height: viewMode === 'list' ? '140px' : '200px',
                    background: colors.bgBadge, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '48px',
                    position: 'relative', flexShrink: 0,
                  }}>
                    {product.emoji}
                    {product.badge && (
                      <span style={{
                        position: 'absolute', top: '10px', left: '10px',
                        padding: '3px 8px', borderRadius: '4px',
                        background: product.badge === 'Sale' ? '#0a0a0a' : product.badge === 'New' ? '#0a0a0a' : '#171717',
                        color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
                      }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '16px', flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '12px', color: colors.textSubtle }}>{product.category}</p>
                    <h3 style={{ margin: '4px 0 8px', fontSize: '15px', fontWeight: '600', color: colors.text }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} color={i < Math.floor(product.rating) ? '#737373' : colors.borderInput} />
                      ))}
                      <span style={{ fontSize: '12px', color: colors.textMuted }}>({product.reviews})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: colors.accent }}>{formatCurrency(product.price)}</span>
                      {product.originalPrice && (
                        <span style={{ fontSize: '13px', color: colors.textSubtle, textDecoration: 'line-through' }}>{formatCurrency(product.originalPrice)}</span>
                      )}
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: '12px', color: product.stock === 0 ? colors.danger : colors.textMuted }}>
                      {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
