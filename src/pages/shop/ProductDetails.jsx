import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Star, ShoppingCart, Heart, Minus, Plus, ChevronLeft,
  Truck, Shield, RotateCcw,
} from 'lucide-react';

const productsData = {
  1: { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, originalPrice: 99.99, stock: 124, rating: 4.5, reviews: 128, emoji: '🎧', badge: 'Best Seller', description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals alike.' },
  2: { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.99, originalPrice: 249.99, stock: 56, rating: 4.8, reviews: 95, emoji: '⌚', badge: 'New', description: 'Advanced smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Water-resistant up to 50 meters.' },
  3: { id: 3, name: 'USB-C Hub Adapter', category: 'Accessories', price: 34.99, originalPrice: null, stock: 230, rating: 4.3, reviews: 67, emoji: '🔌', badge: null, description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and PD charging. Compatible with all USB-C devices.' },
  4: { id: 4, name: 'Laptop Stand Adjustable', category: 'Furniture', price: 45.99, originalPrice: 59.99, stock: 89, rating: 4.6, reviews: 43, emoji: '🖥️', badge: 'Sale', description: 'Ergonomic aluminum laptop stand with adjustable height and angle. Improves posture and airflow for your laptop.' },
  5: { id: 5, name: 'Wireless Mouse Ergonomic', category: 'Electronics', price: 39.99, originalPrice: null, stock: 145, rating: 4.4, reviews: 89, emoji: '🖱️', badge: null, description: 'Ergonomic wireless mouse with adjustable DPI, quiet clicks, and long battery life. Designed for all-day comfort.' },
  6: { id: 6, name: '4K Webcam HD', category: 'Electronics', price: 69.99, originalPrice: 89.99, stock: 34, rating: 4.7, reviews: 56, emoji: '📷', badge: 'Popular', description: 'Ultra HD 4K webcam with auto-focus, low-light correction, and built-in microphone. Perfect for video calls and streaming.' },
  7: { id: 7, name: 'Portable SSD 1TB', category: 'Accessories', price: 99.99, originalPrice: null, stock: 67, rating: 4.9, reviews: 201, emoji: '💾', badge: 'Top Rated', description: 'Ultra-fast portable SSD with 1TB capacity, USB 3.2 interface, and shock-resistant design. Transfer speeds up to 1050MB/s.' },
  8: { id: 8, name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 89.99, originalPrice: 119.99, stock: 0, rating: 4.5, reviews: 134, emoji: '⌨️', badge: 'Sale', description: 'Premium mechanical keyboard with customizable RGB backlighting, hot-swappable switches, and solid aluminum frame.' },
};

const relatedProducts = [
  { id: 5, name: 'Wireless Mouse Ergonomic', price: 39.99, emoji: '🖱️', rating: 4.4 },
  { id: 3, name: 'USB-C Hub Adapter', price: 34.99, emoji: '🔌', rating: 4.3 },
  { id: 9, name: 'Desk Lamp LED', price: 29.99, emoji: '💡', rating: 4.2 },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = productsData[id] || productsData[1];
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px clamp(16px, 3vw, 32px)' }}>
      <Link to="/shop" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '14px', color: colors.textMuted, textDecoration: 'none',
        marginBottom: '20px', transition: 'color 0.15s',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
      >
        <ChevronLeft size={16} /> Back to Shop
      </Link>

      <div className="grid-2col-responsive" style={{ gap: '32px' }}>
        <div style={{
          background: colors.bgCard, borderRadius: '20px', border: `1px solid ${colors.border}`,
          padding: 'clamp(20px, 4vw, 40px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: '300px', position: 'relative',
        }}>
          <span style={{ fontSize: '120px' }}>{product.emoji}</span>
          {product.badge && (
            <span style={{
              position: 'absolute', top: '16px', left: '16px',
              padding: '6px 14px', borderRadius: '8px',
              background: product.badge === 'Sale' ? '#0a0a0a' : product.badge === 'New' ? '#0a0a0a' : '#171717',
              color: '#fff', fontSize: '12px', fontWeight: '700',
            }}>
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '6px',
            background: colors.bgAccent, color: colors.accent,
            fontSize: '12px', fontWeight: '600', marginBottom: '12px',
          }}>
            {product.category}
          </span>
          <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '700', color: colors.text, lineHeight: '1.2' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} color={i < Math.floor(product.rating) ? '#737373' : colors.borderInput} />
              ))}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{product.rating}</span>
            <span style={{ fontSize: '13px', color: colors.textMuted }}>({product.reviews} reviews)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', color: colors.accent }}>{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: '18px', color: colors.textSubtle, textDecoration: 'line-through' }}>{formatCurrency(product.originalPrice)}</span>
                <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#f0f0f0', color: '#0a0a0a', fontSize: '13px', fontWeight: '700' }}>
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <p style={{ margin: '0 0 24px', fontSize: '15px', color: colors.textSecondary, lineHeight: '1.7' }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: `1px solid ${colors.border}`, borderRadius: '10px', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{
                width: '40px', height: '40px', border: 'none', background: colors.bgHover,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: colors.text,
              }}>
                <Minus size={16} />
              </button>
              <span style={{ width: '48px', textAlign: 'center', fontSize: '15px', fontWeight: '600', color: colors.text }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{
                width: '40px', height: '40px', border: 'none', background: colors.bgHover,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: colors.text,
              }}>
                <Plus size={16} />
              </button>
            </div>
            <span style={{
              fontSize: '13px', fontWeight: '500',
              color: product.stock === 0 ? colors.danger : colors.success,
            }}>
              {product.stock === 0 ? 'Out of stock' : `${product.stock} available`}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addToCart(product.id, quantity)}
              disabled={product.stock === 0}
              style={{
                flex: 1, padding: '14px 24px', borderRadius: '12px', border: 'none',
                background: product.stock === 0 ? colors.textSubtle : colors.gradientPrimary,
                color: '#fff', fontSize: '15px', fontWeight: '700', cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: product.stock === 0 ? 'none' : '0 4px 16px rgba(0,0,0,0.12)',
                transition: 'all 0.25s',
              }}
              onMouseEnter={(e) => { if (product.stock > 0) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <ShoppingCart size={18} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              style={{
                width: '52px', height: '52px', borderRadius: '12px',
                border: `1px solid ${inWishlist ? colors.danger : colors.border}`,
                background: inWishlist ? '#f0f0f0' : colors.bgCard,
                color: inWishlist ? colors.danger : colors.textMuted,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <Heart size={20} fill={inWishlist ? colors.danger : 'none'} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { icon: Truck, text: 'Free shipping on orders over $50' },
              { icon: Shield, text: '2-year warranty included' },
              { icon: RotateCcw, text: '30-day easy returns' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={colors.success} />
                  <span style={{ fontSize: '13px', color: colors.textSecondary }}>{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        marginTop: '40px', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}`, overflowX: 'auto' }}>
          {['description', 'specifications', 'reviews'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '14px 24px', border: 'none', background: 'transparent',
              fontSize: '14px', fontWeight: activeTab === tab ? '600' : '400',
              color: activeTab === tab ? colors.accent : colors.textMuted,
              cursor: 'pointer', textTransform: 'capitalize',
              borderBottom: `2px solid ${activeTab === tab ? colors.accent : 'transparent'}`,
              transition: 'all 0.15s',
            }}>
              {tab}
            </button>
          ))}
        </div>
        <div style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
          {activeTab === 'description' && (
            <p style={{ margin: 0, fontSize: '14px', color: colors.textSecondary, lineHeight: '1.8' }}>{product.description}</p>
          )}
          {activeTab === 'specifications' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { label: 'Category', value: product.category },
                { label: 'Stock', value: `${product.stock} units` },
                { label: 'Rating', value: `${product.rating}/5` },
                { label: 'Reviews', value: product.reviews },
              ].map((spec) => (
                <div key={spec.label} style={{ padding: '12px', borderRadius: '8px', background: colors.bgHover }}>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textSubtle }}>{spec.label}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '14px', fontWeight: '600', color: colors.text }}>{spec.value}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'reviews' && (
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <Star size={36} color={colors.textSubtle} style={{ marginBottom: '12px' }} />
              <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.text }}>Customer Reviews</p>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: colors.textMuted }}>
                {product.reviews} reviews with an average rating of {product.rating}/5
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '700', color: colors.text }}>Related Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: colors.bgCard, borderRadius: '14px', border: `1px solid ${colors.border}`,
                padding: '16px', transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  height: '120px', background: colors.bgBadge, borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: '12px',
                }}>
                  {p.emoji}
                </div>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: '600', color: colors.text }}>{p.name}</h4>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.accent }}>{formatCurrency(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
