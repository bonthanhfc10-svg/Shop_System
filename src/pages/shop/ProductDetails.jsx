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
  1: { id: 1, name: 'Classic White T-Shirt', category: 'Shirts', sub: 'T-Shirts', price: 19.99, originalPrice: 29.99, stock: 124, rating: 4.7, reviews: 234, emoji: '👕', badge: 'Best Seller', description: 'A timeless classic made from 100% premium cotton. Features a comfortable regular fit, crew neck design, and pre-shrunk fabric that maintains its shape wash after wash. Perfect for everyday wear.' },
  2: { id: 2, name: 'Slim Fit Blue Jeans', category: 'Pants', sub: 'Jeans', price: 39.99, originalPrice: 54.99, stock: 87, rating: 4.8, reviews: 189, emoji: '👖', badge: 'New', description: 'Premium slim-fit jeans crafted from stretch denim for all-day comfort. Features a modern tapered leg, classic five-pocket styling, and a mid-rise waist. Available in authentic blue wash.' },
  3: { id: 3, name: 'White Running Sneakers', category: 'Shoes', sub: 'Sneakers', price: 59.99, originalPrice: null, stock: 201, rating: 4.6, reviews: 312, emoji: '👟', badge: null, description: 'Lightweight performance sneakers designed for both running and casual wear. Features responsive cushioning, breathable mesh upper, and durable rubber outsole for superior traction.' },
  4: { id: 4, name: 'Polo Shirt Navy', category: 'Shirts', sub: 'Polo Shirts', price: 24.99, originalPrice: 34.99, stock: 65, rating: 4.5, reviews: 145, emoji: '👔', badge: 'Sale', description: 'Classic polo shirt in rich navy blue. Made from breathable pique cotton with a two-button placket, ribbed collar, and side vents for a relaxed yet polished look.' },
  5: { id: 5, name: 'Cargo Pants Olive', category: 'Pants', sub: 'Cargo Pants', price: 34.99, originalPrice: null, stock: 98, rating: 4.4, reviews: 98, emoji: '👖', badge: null, description: 'Versatile cargo pants in military olive green. Features multiple utility pockets, adjustable ankle cuffs, and a comfortable relaxed fit. Made from durable cotton twill.' },
  6: { id: 6, name: 'Casual Canvas Shoes', category: 'Shoes', sub: 'Casual Shoes', price: 29.99, originalPrice: 44.99, stock: 45, rating: 4.7, reviews: 167, emoji: '👞', badge: 'Popular', description: 'Everyday canvas sneakers with a minimalist design. Features canvas upper, cushioned insole for comfort, and vulcanized rubber sole. Available in multiple colors.' },
  7: { id: 7, name: 'Long Sleeve Flannel', category: 'Shirts', sub: 'Long Sleeve Shirts', price: 32.99, originalPrice: null, stock: 112, rating: 4.9, reviews: 89, emoji: '👕', badge: 'Top Rated', description: 'Cozy flannel shirt in classic plaid pattern. Made from soft brushed cotton with a relaxed fit, button-down collar, and dual chest pockets. Perfect for cooler weather.' },
  8: { id: 8, name: 'Summer Shorts Khaki', category: 'Pants', sub: 'Shorts', price: 22.99, originalPrice: 29.99, stock: 0, rating: 4.3, reviews: 201, emoji: '🩳', badge: 'Sale', description: 'Lightweight chino shorts ideal for warm weather. Features a flat front, side pockets, and a comfortable 7-inch inseam. Made from breathable cotton blend fabric.' },
  9: { id: 9, name: 'Black Graphic Tee', category: 'Shirts', sub: 'T-Shirts', price: 17.99, originalPrice: null, stock: 156, rating: 4.2, reviews: 78, emoji: '👕', badge: null, description: 'Bold graphic t-shirt featuring original artwork. Made from soft cotton jersey with a modern regular fit. Machine washable for easy care.' },
  10: { id: 10, name: 'Leather Sandals Brown', category: 'Shoes', sub: 'Sandals', price: 35.99, originalPrice: 49.99, stock: 92, rating: 4.7, reviews: 156, emoji: '🩴', badge: 'New', description: 'Handcrafted genuine leather sandals with adjustable straps. Features a cushioned footbed and durable rubber sole for all-day comfort. Perfect for beach or casual outings.' },
  11: { id: 11, name: 'Casual Linen Shirt', category: 'Shirts', sub: 'Casual Shirts', price: 28.99, originalPrice: null, stock: 78, rating: 4.5, reviews: 67, emoji: '👔', badge: null, description: 'Breathable linen shirt perfect for warm days. Features a relaxed fit, spread collar, and roll-up sleeve tabs. Made from 100% natural linen for ultimate comfort.' },
  12: { id: 12, name: 'Sports Running Shoes', category: 'Shoes', sub: 'Sports Shoes', price: 64.99, originalPrice: 79.99, stock: 34, rating: 4.8, reviews: 245, emoji: '👟', badge: 'Best Seller', description: 'High-performance running shoes with advanced energy-return technology. Features a lightweight knit upper, supportive heel counter, and high-traction rubber outsole.' },
  13: { id: 13, name: 'Regular Fit Chinos', category: 'Pants', sub: 'Casual Pants', price: 27.99, originalPrice: null, stock: 143, rating: 4.3, reviews: 112, emoji: '👖', badge: null, description: 'Classic chino pants with a regular fit and straight leg. Made from soft cotton twill with a clean finish. Versatile enough for work or weekend wear.' },
  14: { id: 14, name: 'Striped V-Neck Tee', category: 'Shirts', sub: 'T-Shirts', price: 15.99, originalPrice: 22.99, stock: 189, rating: 4.1, reviews: 56, emoji: '👕', badge: 'Sale', description: 'Casual striped v-neck t-shirt made from soft cotton blend. Features a flattering v-neckline and relaxed fit. Great layering piece or standalone wear.' },
  15: { id: 15, name: 'Denim Jacket Blue', category: 'Shirts', sub: 'Casual Shirts', price: 49.99, originalPrice: 69.99, stock: 42, rating: 4.6, reviews: 134, emoji: '🧥', badge: 'Popular', description: 'Classic denim jacket in vintage blue wash. Features button-front closure, chest pockets, and adjustable button cuffs. A wardrobe essential that never goes out of style.' },
  16: { id: 16, name: 'Athletic Shorts Black', category: 'Pants', sub: 'Shorts', price: 18.99, originalPrice: null, stock: 167, rating: 4.4, reviews: 89, emoji: '🩳', badge: null, description: 'Performance athletic shorts with moisture-wicking fabric. Features an elastic waistband with drawcord, side pockets, and a 5-inch inseam for freedom of movement.' },
  17: { id: 17, name: 'Formal Oxford Shoes', category: 'Shoes', sub: 'Casual Shoes', price: 74.99, originalPrice: 99.99, stock: 28, rating: 4.9, reviews: 78, emoji: '👞', badge: 'Top Rated', description: 'Elegant Oxford dress shoes crafted from polished leather. Features a Goodyear welted construction, leather lining, and rubber sole for lasting comfort and sophistication.' },
  18: { id: 18, name: 'Plaid Button Down', category: 'Shirts', sub: 'Long Sleeve Shirts', price: 36.99, originalPrice: null, stock: 95, rating: 4.5, reviews: 102, emoji: '👔', badge: null, description: 'Stylish plaid button-down shirt in warm autumn tones. Made from soft flannel cotton with a regular fit, button-down collar, and back box pleat for easy movement.' },
};

const relatedProducts = [
  { id: 5, name: 'Cargo Pants Olive', price: 34.99, emoji: '👖', rating: 4.4 },
  { id: 3, name: 'White Running Sneakers', price: 59.99, emoji: '👟', rating: 4.6 },
  { id: 9, name: 'Black Graphic Tee', price: 17.99, emoji: '👕', rating: 4.2 },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetails() {
  const { id } = useParams();
  const { colors } = useTheme();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
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
            {product.sub}
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

          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '10px', display: 'block' }}>Size:</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    border: `2px solid ${selectedSize === size ? colors.accent : colors.border}`,
                    background: selectedSize === size ? colors.bgAccent : colors.bgCard,
                    color: selectedSize === size ? colors.accent : colors.text,
                    fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

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
                { label: 'Subcategory', value: product.sub },
                { label: 'Stock', value: `${product.stock} units` },
                { label: 'Rating', value: `${product.rating}/5` },
                { label: 'Reviews', value: product.reviews },
                { label: 'Sizes Available', value: 'XS - XXL' },
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
