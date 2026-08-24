import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import coverImg from '../../assets/images/Cover.png';
import coverImg1 from '../../assets/images/Cover1.png';
import coverImg2 from '../../assets/images/Cover2.png';
import coverImg3 from '../../assets/images/Cover3.png';
import coverImg4 from '../../assets/images/Cover4.png';
import bannerImg from '../../assets/images/Banner.png';

import { formatCurrency } from '../../utils/formatCurrency';
import {
  Star, ArrowRight, Truck, Shield, RotateCcw, Headphones,
  ChevronRight, Zap, Newspaper,
} from 'lucide-react';

const heroCovers = [
  { src: coverImg, alt: 'Kh-Shop - Your one-stop shop for everything' },
  { src: coverImg1, alt: 'Kh-Shop featured collection 1' },
  { src: coverImg2, alt: 'Kh-Shop featured collection 2' },
  { src: coverImg3, alt: 'Kh-Shop featured collection 3' },
  { src: coverImg4, alt: 'Kh-Shop featured collection 4' },
];

const featuredProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, originalPrice: 99.99, rating: 4.5, reviews: 128, emoji: '🎧', badge: 'Best Seller' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.99, originalPrice: 249.99, rating: 4.8, reviews: 95, emoji: '⌚', badge: 'New' },
  { id: 3, name: 'USB-C Hub Adapter', category: 'Accessories', price: 34.99, originalPrice: null, rating: 4.3, reviews: 67, emoji: '🔌', badge: null },
  { id: 4, name: 'Laptop Stand Adjustable', category: 'Furniture', price: 45.99, originalPrice: 59.99, rating: 4.6, reviews: 43, emoji: '🖥️', badge: 'Sale' },
  { id: 5, name: 'Wireless Mouse Ergonomic', category: 'Electronics', price: 39.99, originalPrice: null, rating: 4.4, reviews: 89, emoji: '🖱️', badge: null },
  { id: 6, name: '4K Webcam HD', category: 'Electronics', price: 69.99, originalPrice: 89.99, rating: 4.7, reviews: 56, emoji: '📷', badge: 'Popular' },
  { id: 7, name: 'Portable SSD 1TB', category: 'Accessories', price: 99.99, originalPrice: null, rating: 4.9, reviews: 201, emoji: '💾', badge: 'Top Rated' },
  { id: 8, name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 89.99, originalPrice: 119.99, rating: 4.5, reviews: 134, emoji: '⌨️', badge: 'Sale' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', gradient: '#000000' },
  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout', gradient: '#262626' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy', gradient: '#404040' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team', gradient: '#404040' },
];

const categories = [
  { name: 'Fashion', emoji: '👗', subs: ['Men', 'Women', 'Kids'] },
  { name: 'Shoes', emoji: '👟', subs: ['Sneakers', 'Sandals', 'Sports Shoes'] },
  { name: 'Bags & Accessories', emoji: '👜', subs: ['Handbags', 'Backpacks', 'Watches', 'Jewelry'] },
  { name: 'Beauty', emoji: '💄', subs: ['Skincare', 'Makeup', 'Perfume'] },
  { name: 'Electronics', emoji: '📱', subs: ['Phones', 'Accessories', 'Gadgets'] },
  { name: 'Home & Living', emoji: '🏠', subs: ['Decoration', 'Kitchen', 'Furniture'] },
  { name: 'Gaming', emoji: '🎮', subs: ['Gaming Accessories', 'Consoles'] },
  { name: 'Sale', emoji: '🔥', subs: [], sale: true },
];

const newsTicker = [
  { icon: Zap, text: 'New Season Collection is here — up to 50% off' },
  { icon: Truck, text: 'Free shipping on all orders over $50' },
  { icon: RotateCcw, text: '30-day easy returns, no questions asked' },
  { icon: Shield, text: '100% secure payments — KHQR, Visa & Mastercard' },
  { icon: Headphones, text: '24/7 customer support, always here to help' },
];

function ProductCard({ product, colors }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: colors.bgCard, borderRadius: '12px', border: `1px solid ${colors.border}`,
        overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
      }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = colors.shadowLg; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{
          height: '160px', background: colors.bgBadge, display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '44px',
          position: 'relative',
        }}>
          {product.emoji}
          {product.badge && (
            <span style={{
              position: 'absolute', top: '10px', left: '10px',
              padding: '3px 8px', borderRadius: '5px',
              background: product.badge === 'Sale' ? '#0a0a0a' : product.badge === 'New' ? '#0a0a0a' : '#171717',
              color: '#fff', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
            }}>
              {product.badge}
            </span>
          )}
        </div>
        <div style={{ padding: '12px 14px' }}>
          <p style={{ margin: 0, fontSize: '11px', color: colors.textSubtle, fontWeight: '500' }}>
            {product.category}
          </p>
          <h3 style={{ margin: '4px 0 6px', fontSize: '14px', fontWeight: '600', color: colors.text, lineHeight: '1.3' }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill={i < Math.floor(product.rating) ? '#737373' : 'none'} color={i < Math.floor(product.rating) ? '#737373' : colors.borderInput} />
            ))}
            <span style={{ fontSize: '11px', color: colors.textMuted, marginLeft: '4px' }}>
              ({product.reviews})
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: colors.accent }}>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '12px', color: colors.textSubtle, textDecoration: 'line-through' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {discount && (
              <span style={{
                padding: '2px 7px', borderRadius: '4px',
                background: '#f0f0f0', color: '#0a0a0a',
                fontSize: '10px', fontWeight: '700',
              }}>
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CategoryCard({ cat, colors }) {
  const isSale = Boolean(cat.sale);
  const navigate = useNavigate();
  const categoryPath = `/shop?category=${encodeURIComponent(cat.name)}`;

  return (
    <div
      onClick={() => navigate(categoryPath)}
      style={{
        padding: '14px', borderRadius: '12px', cursor: 'pointer',
        background: isSale ? '#404040' : colors.bgCard,
        border: `1px solid ${isSale ? 'transparent' : colors.border}`,
        transition: 'all 0.25s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = isSale ? '0 12px 28px rgba(0,0,0,0.35)' : colors.shadowLg; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: cat.subs.length > 0 ? '12px' : '2px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
          background: isSale ? 'rgba(255,255,255,0.22)' : colors.bgBadge,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px',
        }}>
          {cat.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: isSale ? '#fff' : colors.text }}>
            {cat.name}
          </p>
          <p style={{ margin: '1px 0 0', fontSize: '11px', color: isSale ? 'rgba(255,255,255,0.9)' : colors.textMuted }}>
            {isSale ? 'Limited-time deals inside' : `${cat.subs.length} collections`}
          </p>
        </div>
        <ChevronRight size={15} color={isSale ? '#fff' : colors.textSubtle} />
      </div>
      {cat.subs.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {cat.subs.map((sub) => (
            <Link
              key={sub}
              to={`/shop?category=${encodeURIComponent(sub)}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                textDecoration: 'none', fontSize: '11px', fontWeight: '500',
                padding: '4px 10px', borderRadius: '999px',
                background: isSale ? 'rgba(255,255,255,0.18)' : colors.bgBadge,
                border: `1px solid ${isSale ? 'rgba(255,255,255,0.35)' : colors.border}`,
                color: isSale ? '#fff' : colors.textMuted,
                transition: 'all 0.15s',
              }}
                onMouseEnter={(e) => {
                  if (isSale) { e.currentTarget.style.background = 'rgba(255,255,255,0.32)'; } else { e.currentTarget.style.color = colors.accent; e.currentTarget.style.borderColor = colors.accentLight; }
                }}
                onMouseLeave={(e) => {
                  if (isSale) { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; } else { e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.borderColor = colors.border; }
                }}
            >
              {sub}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { colors } = useTheme();
  const [activeCover, setActiveCover] = useState(0);
  const [coverPaused, setCoverPaused] = useState(false);

  useEffect(() => {
    if (coverPaused) return undefined;
    const id = setInterval(() => {
      setActiveCover((prev) => (prev + 1) % heroCovers.length);
    }, 3500);
    return () => clearInterval(id);
  }, [coverPaused]);

  return (
    <div>
      <section
        className="news-ticker"
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'stretch', overflow: 'hidden',
        }}
      >
        <div style={{
          flexShrink: 0, zIndex: 2, display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px',
          background: '#000000',
          color: '#fff', fontSize: '11px', fontWeight: '700',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
          paddingRight: '24px',
        }}>
          <Newspaper size={13} /> Latest
        </div>
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div className="news-ticker-track">
            {[...newsTicker, ...newsTicker].map((item, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '8px 0', margin: '0 24px', whiteSpace: 'nowrap',
                fontSize: '12px', color: 'rgba(255,255,255,0.85)',
              }}>
                <item.icon size={13} color="#fafafa" />
                {item.text}
              </span>
            ))}
          </div>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: '32px',
            background: 'linear-gradient(90deg, #0a0a0a 20%, transparent)', pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 0, bottom: 0, right: 0, width: '32px',
            background: 'linear-gradient(270deg, #0a0a0a 20%, transparent)', pointerEvents: 'none',
          }} />
        </div>
      </section>

      <section style={{
        background: `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.55)), url(${bannerImg}) center / cover no-repeat`,
        padding: 'clamp(34px, 5vw, 60px) clamp(16px, 3vw, 32px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.12)', color: '#fafafa',
              fontSize: '12px', fontWeight: '600', marginBottom: '14px',
              backdropFilter: 'blur(8px)',
            }}>
              <Zap size={13} /> New Season Collection
            </span>
            <h1 style={{
              margin: 0, fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: '800',
              color: '#fff', lineHeight: '1.1', letterSpacing: '-0.03em',
            }}>
              Discover the<br />
              <span style={{ background: 'linear-gradient(90deg, #ffffff 0%, #d4d4d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Best Deals
              </span>
            </h1>
            <p style={{
              margin: '14px 0 24px', fontSize: 'clamp(13px, 1.6vw, 15px)',
              color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', maxWidth: '480px',
            }}>
              Shop the latest electronics, accessories, and more at unbeatable prices. Quality products delivered to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '11px 22px', borderRadius: '10px',
                background: '#fff', color: '#0a0a0a',
                fontSize: '13px', fontWeight: '700', textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/shop" style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '11px 22px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.12)', color: '#fff',
                fontSize: '13px', fontWeight: '600', textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
              >
                View Categories
              </Link>
            </div>
          </div>
          <div
            className="hide-mobile"
            style={{ width: '380px', maxWidth: '36%', flexShrink: 0 }}
            onMouseEnter={() => setCoverPaused(true)}
            onMouseLeave={() => setCoverPaused(false)}
          >
            <div style={{
              position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.25)',
              boxShadow: '0 20px 48px rgba(0,0,0,0.35)',
              aspectRatio: '16 / 10', background: 'rgba(255,255,255,0.08)',
            }}>
              {heroCovers.map((cover, i) => (
                <img
                  key={cover.src}
                  src={cover.src}
                  alt={i === activeCover ? cover.alt : ''}
                  style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: i === activeCover ? 1 : 0,
                    transform: i === activeCover ? 'scale(1)' : 'scale(1.06)',
                    transition: 'opacity 0.6s ease, transform 1.4s ease',
                    pointerEvents: i === activeCover ? 'auto' : 'none',
                  }}
                />
              ))}
              <div style={{
                position: 'absolute', bottom: '10px', left: 0, right: 0,
                display: 'flex', justifyContent: 'center', gap: '5px',
              }}>
                {heroCovers.map((cover, i) => (
                  <button
                    key={cover.src}
                    onClick={() => setActiveCover(i)}
                    aria-label={`Go to cover ${i + 1}`}
                    style={{
                      width: i === activeCover ? '16px' : '7px',
                      height: '7px', borderRadius: '7px', border: 'none',
                      padding: 0, cursor: 'pointer',
                      background: i === activeCover ? '#fff' : 'rgba(255,255,255,0.45)',
                      transition: 'all 0.25s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '-80px', right: '200px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
      </section>

      <section style={{
        maxWidth: '1280px', margin: '0 auto', padding: '32px clamp(16px, 3vw, 32px)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px' }}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px', borderRadius: '12px',
                background: colors.bgCard, border: `1px solid ${colors.border}`,
                transition: 'all 0.25s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: f.gradient, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color="#fff" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.text }}>{f.title}</p>
                  <p style={{ margin: '1px 0 0', fontSize: '11px', color: colors.textMuted }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px) 36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: colors.text }}>Browse Categories</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>Find what you need</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
          {categories.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} colors={colors} />
          ))}
        </div>
      </section>

      <section style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px) 36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: colors.text }}>Featured Products</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>Hand-picked for you</p>
          </div>
          <Link to="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '13px', fontWeight: '600', color: colors.accent,
            textDecoration: 'none', transition: 'opacity 0.15s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            View All <ChevronRight size={15} />
          </Link>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '14px',
        }}>
          {featuredProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} colors={colors} />
          ))}
        </div>
      </section>

      <section style={{
        maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px) 40px',
      }}>
        <div style={{
          background: '#000000',
          borderRadius: '16px', padding: 'clamp(24px, 4vw, 40px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(20px, 3.2vw, 28px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
              Join Our Newsletter
            </h2>
            <p style={{ margin: '10px auto 22px', fontSize: '13px', color: 'rgba(255,255,255,0.85)', maxWidth: '460px' }}>
              Subscribe to get exclusive offers, new arrivals, and insider-only discounts.
            </p>
            <div style={{
              display: 'flex', gap: '8px', maxWidth: '420px', margin: '0 auto',
              flexWrap: 'wrap', justifyContent: 'center',
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: '1 1 240px', padding: '11px 15px', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: '13px', outline: 'none',
                  backdropFilter: 'blur(8px)',
                }}
              />
              <button style={{
                padding: '11px 22px', borderRadius: '10px', border: 'none',
                background: '#fff', color: '#0a0a0a',
                fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </section>
    </div>
  );
}
