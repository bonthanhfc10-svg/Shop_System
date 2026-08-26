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
  { src: coverImg, alt: 'Kh Shop - Quality Fashion' },
  { src: coverImg1, alt: 'KH Shop featured collection 1' },
  { src: coverImg2, alt: 'KH Shop featured collection 2' },
  { src: coverImg3, alt: 'KH Shop featured collection 3' },
  { src: coverImg4, alt: 'KH Shop featured collection 4' },
];

const featuredProducts = [
  { id: 1, name: 'Classic White T-Shirt', category: 'Shirts', sub: 'T-Shirts', price: 19.99, originalPrice: 29.99, rating: 4.7, reviews: 234, emoji: '👕', badge: 'Best Seller' },
  { id: 2, name: 'Slim Fit Blue Jeans', category: 'Pants', sub: 'Jeans', price: 39.99, originalPrice: 54.99, rating: 4.8, reviews: 189, emoji: '👖', badge: 'New' },
  { id: 3, name: 'White Running Sneakers', category: 'Shoes', sub: 'Sneakers', price: 59.99, originalPrice: null, rating: 4.6, reviews: 312, emoji: '👟', badge: null },
  { id: 4, name: 'Polo Shirt Navy', category: 'Shirts', sub: 'Polo Shirts', price: 24.99, originalPrice: 34.99, rating: 4.5, reviews: 145, emoji: '👔', badge: 'Sale' },
  { id: 5, name: 'Cargo Pants Olive', category: 'Pants', sub: 'Cargo Pants', price: 34.99, originalPrice: null, rating: 4.4, reviews: 98, emoji: '👖', badge: null },
  { id: 6, name: 'Casual Canvas Shoes', category: 'Shoes', sub: 'Casual Shoes', price: 29.99, originalPrice: 44.99, rating: 4.7, reviews: 167, emoji: '👞', badge: 'Popular' },
  { id: 7, name: 'Long Sleeve Flannel', category: 'Shirts', sub: 'Long Sleeve Shirts', price: 32.99, originalPrice: null, rating: 4.9, reviews: 89, emoji: '👕', badge: 'Top Rated' },
  { id: 8, name: 'Summer Shorts Khaki', category: 'Pants', sub: 'Shorts', price: 22.99, originalPrice: 29.99, rating: 4.3, reviews: 201, emoji: '🩳', badge: 'Sale' },
];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', gradient: '#000000' },
  { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout', gradient: '#262626' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy', gradient: '#404040' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team', gradient: '#404040' },
];

const categories = [
  { name: 'Shirts', emoji: '👕', subs: ['T-Shirts', 'Polo Shirts', 'Casual Shirts', 'Long Sleeve Shirts'] },
  { name: 'Pants', emoji: '👖', subs: ['Jeans', 'Cargo Pants', 'Casual Pants', 'Shorts'] },
  { name: 'Shoes', emoji: '👟', subs: ['Sneakers', 'Casual Shoes', 'Sandals', 'Sports Shoes'] },
];

const newsTicker = [
  { icon: Zap, text: 'New Season Collection is here — up to 40% off' },
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
            {product.sub || product.category}
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
  const navigate = useNavigate();
  const categoryPath = `/shop?category=${encodeURIComponent(cat.name)}`;

  return (
    <div
      onClick={() => navigate(categoryPath)}
      style={{
        padding: '14px', borderRadius: '12px', cursor: 'pointer',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        transition: 'all 0.25s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowLg; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: cat.subs.length > 0 ? '12px' : '2px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
          background: colors.bgBadge,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '19px',
        }}>
          {cat.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
            {cat.name}
          </p>
          <p style={{ margin: '1px 0 0', fontSize: '11px', color: colors.textMuted }}>
            {cat.subs.length} collections
          </p>
        </div>
        <ChevronRight size={15} color={colors.textSubtle} />
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
                background: colors.bgBadge,
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
                transition: 'all 0.15s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent; e.currentTarget.style.borderColor = colors.accentLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textMuted; e.currentTarget.style.borderColor = colors.border;
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
        className="news-ticker flex items-stretch overflow-hidden"
        style={{
          background: '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="shrink-0 z-2 flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white"
          style={{
            background: '#000000',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)',
            paddingRight: '24px',
          }}
        >
          <Newspaper size={13} /> Latest
        </div>
        <div className="relative flex-1 overflow-hidden flex items-center">
          <div className="news-ticker-track">
            {[...newsTicker, ...newsTicker].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs px-0 py-2 mx-6" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <item.icon size={13} color="#fafafa" />
                {item.text}
              </span>
            ))}
          </div>
          <div className="absolute top-0 bottom-0 left-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(90deg, #0a0a0a 20%, transparent)' }} />
          <div className="absolute top-0 bottom-0 right-0 w-8 pointer-events-none" style={{ background: 'linear-gradient(270deg, #0a0a0a 20%, transparent)' }} />
        </div>
      </section>

      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16"
        style={{
          background: `linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.55)), url(${bannerImg}) center / cover no-repeat`,
        }}
      >
        <div className="max-w-7xl mx-auto relative z-1 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-10">
          <div className="w-full lg:max-w-150 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 sm:mb-4"
              style={{ background: 'rgba(255,255,255,0.12)', color: '#fafafa', backdropFilter: 'blur(8px)' }}
            >
              <Zap size={13} /> New Season Collection
            </span>
            <h1 className="m-0 font-extrabold text-white leading-[1.1] tracking-tight text-[22px] sm:text-[30px] lg:text-[40px]">
              Discover the{' '}
              <span style={{ background: 'linear-gradient(90deg, #ffffff 0%, #d4d4d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Best Deals
              </span>
            </h1>
            <p className="m-0 mt-3 sm:mt-4 mb-4 sm:mb-6 max-w-120 mx-auto lg:mx-0 text-xs sm:text-sm lg:text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Shop the latest shirts, pants, and shoes at unbeatable prices. Quality fashion delivered to your doorstep.
            </p>
            <div className="flex gap-2.5 justify-center lg:justify-start flex-wrap">
              <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-white text-[#0a0a0a] text-[13px] font-bold no-underline shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-white text-[13px] font-semibold no-underline border border-white/20 backdrop-blur-sm transition-all hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.12)' }}>
                View Categories
              </Link>
            </div>
          </div>

          {/* Cover carousel */}
          <div
            className="w-full max-w-85 sm:max-w-95 lg:max-w-none lg:w-[36%] shrink-0"
            onMouseEnter={() => setCoverPaused(true)}
            onMouseLeave={() => setCoverPaused(false)}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/25 shadow-[0_20px_48px_rgba(0,0,0,0.35)] bg-white/5" style={{ aspectRatio: '16 / 10' }}>
              {heroCovers.map((cover, i) => (
                <img
                  key={cover.src}
                  src={cover.src}
                  alt={i === activeCover ? cover.alt : ''}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: i === activeCover ? 1 : 0,
                    transform: i === activeCover ? 'scale(1)' : 'scale(1.06)',
                    transition: 'opacity 0.6s ease, transform 1.4s ease',
                    pointerEvents: i === activeCover ? 'auto' : 'none',
                  }}
                />
              ))}
              <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5">
                {heroCovers.map((cover, i) => (
                  <button
                    key={cover.src}
                    onClick={() => setActiveCover(i)}
                    aria-label={`Go to cover ${i + 1}`}
                    className="border-none cursor-pointer transition-all"
                    style={{
                      width: i === activeCover ? '18px' : '8px',
                      height: '8px',
                      borderRadius: '8px',
                      padding: 0,
                      background: i === activeCover ? '#fff' : 'rgba(255,255,255,0.45)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-20 right-50 w-62.5 h-62.5 rounded-full bg-white/5" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-3 p-3.5 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = colors.shadowMd; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="w-9.5 h-9.5 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: f.gradient }}>
                  <Icon size={18} color="#fff" />
                </div>
                <div>
                  <p className="m-0 text-[13px] font-semibold" style={{ color: colors.text }}>{f.title}</p>
                  <p className="m-0 mt-px text-[11px]" style={{ color: colors.textMuted }}>{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-9">
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div>
            <h2 className="m-0 text-lg sm:text-xl font-bold" style={{ color: colors.text }}>Browse Categories</h2>
            <p className="mt-1 text-[13px]" style={{ color: colors.textMuted }}>Find what you need</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} colors={colors} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-9">
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <div>
            <h2 className="m-0 text-lg sm:text-xl font-bold" style={{ color: colors.text }}>Featured Products</h2>
            <p className="mt-1 text-[13px]" style={{ color: colors.textMuted }}>Hand-picked for you</p>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1 text-[13px] font-semibold no-underline transition-opacity hover:opacity-80" style={{ color: colors.accent }}>
            View All <ChevronRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
          {featuredProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} colors={colors} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-[#000000] rounded-2xl p-6 sm:p-8 lg:p-10 text-center relative overflow-hidden">
            <div className="relative z-1">
            <h2 className="m-0 text-xl sm:text-[28px] font-extrabold text-white tracking-tight">Join Our Newsletter</h2>
            <p className="mt-2.5 mb-5 mx-auto text-[13px] max-w-115" style={{ color: 'rgba(255,255,255,0.85)' }}>
              Subscribe to get exclusive offers, new arrivals, and insider-only discounts.
            </p>
            <div className="flex gap-2 max-w-105 mx-auto flex-wrap justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-[1_1_240px] px-4 py-2.5 rounded-[10px] border border-white/25 bg-white/15 text-white text-[13px] outline-none backdrop-blur-sm"
              />
              <button className="px-5 py-2.5 rounded-[10px] border-none bg-white text-[#0a0a0a] text-[13px] font-bold cursor-pointer transition-all hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
          <div className="absolute -top-15 -right-15 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 -left-10 w-30 h-30 rounded-full bg-white/5" />
        </div>
      </section>
    </div>
  );
}
