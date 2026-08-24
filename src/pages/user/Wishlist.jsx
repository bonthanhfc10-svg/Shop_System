import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/formatCurrency';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

const wishlistProducts = [
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.99, emoji: '⌚', rating: 4.8 },
  { id: 6, name: '4K Webcam HD', category: 'Electronics', price: 69.99, emoji: '📷', rating: 4.7 },
  { id: 10, name: 'Noise Cancelling Earbuds', category: 'Electronics', price: 129.99, emoji: '🎵', rating: 4.7 },
  { id: 7, name: 'Portable SSD 1TB', category: 'Accessories', price: 99.99, emoji: '💾', rating: 4.9 },
];

export default function Wishlist() {
  const { colors } = useTheme();
  const { toggleWishlist } = useWishlist();
  const [items, setItems] = useState(wishlistProducts);

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toggleWishlist(id);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700', color: colors.text }}>
        My Wishlist ({items.length})
      </h1>

      {items.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 20px',
          background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        }}>
          <Heart size={48} color={colors.textSubtle} style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.text }}>Your wishlist is empty</h3>
          <p style={{ margin: '8px 0 20px', fontSize: '14px', color: colors.textMuted }}>Save items you love for later</p>
          <Link to="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 24px', borderRadius: '10px', textDecoration: 'none',
            background: colors.gradientPrimary, color: '#fff', fontSize: '14px', fontWeight: '600',
          }}>Browse Shop</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {items.map((product) => (
            <div key={product.id} style={{
              background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`,
              overflow: 'hidden', transition: 'all 0.25s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Link to={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  height: '160px', background: colors.bgBadge, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '48px',
                }}>
                  {product.emoji}
                </div>
              </Link>
              <div style={{ padding: '14px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: colors.textSubtle }}>{product.category}</p>
                <Link to={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h4 style={{ margin: '4px 0 6px', fontSize: '14px', fontWeight: '600', color: colors.text }}>{product.name}</h4>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <Star size={12} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ fontSize: '12px', color: colors.textMuted }}>{product.rating}</span>
                </div>
                <p style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: '700', color: colors.accent }}>{formatCurrency(product.price)}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link to={`/shop/${product.id}`} style={{
                    flex: 1, padding: '8px', borderRadius: '8px', textDecoration: 'none',
                    background: colors.gradientPrimary, color: '#fff',
                    fontSize: '12px', fontWeight: '600', textAlign: 'center',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                  }}>
                    <ShoppingCart size={13} /> Add to Cart
                  </Link>
                  <button onClick={() => removeItem(product.id)} style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    border: `1px solid ${colors.borderDanger}`, background: colors.bgDanger,
                    color: colors.danger, cursor: 'pointer', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
