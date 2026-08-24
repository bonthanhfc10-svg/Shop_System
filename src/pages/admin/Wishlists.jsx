import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Heart, Search, ShoppingBag, Users, TrendingUp, BarChart3,
} from 'lucide-react';

const wishlists = [
  {
    id: 1,
    user: 'John Doe',
    items: 5,
    products: [
      { name: 'Wireless Headphones', emoji: '🎧' },
      { name: 'Smart Watch', emoji: '⌚' },
      { name: 'USB-C Hub', emoji: '🔌' },
      { name: 'Laptop Stand', emoji: '💻' },
      { name: 'Mechanical Keyboard', emoji: '⌨️' },
    ],
  },
  {
    id: 2,
    user: 'Jane Smith',
    items: 3,
    products: [
      { name: 'Portable Charger', emoji: '🔋' },
      { name: 'Wireless Mouse', emoji: '🖱️' },
      { name: '4K Webcam', emoji: '📷' },
    ],
  },
  {
    id: 3,
    user: 'Bob Wilson',
    items: 7,
    products: [
      { name: 'Gaming Console', emoji: '🎮' },
      { name: 'Headphones', emoji: '🎧' },
      { name: 'SSD 1TB', emoji: '💾' },
      { name: 'Monitor Stand', emoji: '🖥️' },
      { name: 'Keyboard', emoji: '⌨️' },
      { name: 'Mouse', emoji: '🖱️' },
      { name: 'Webcam', emoji: '📷' },
    ],
  },
  {
    id: 4,
    user: 'Alice Brown',
    items: 2,
    products: [
      { name: 'Smart Watch', emoji: '⌚' },
      { name: 'Fitness Band', emoji: '⌚' },
    ],
  },
  {
    id: 5,
    user: 'Charlie Davis',
    items: 4,
    products: [
      { name: 'Laptop Sleeve', emoji: '💻' },
      { name: 'USB Hub', emoji: '🔌' },
      { name: 'Phone Case', emoji: '📱' },
      { name: 'Screen Protector', emoji: '📱' },
    ],
  },
  {
    id: 6,
    user: 'Diana Evans',
    items: 6,
    products: [
      { name: 'Wireless Earbuds', emoji: '🎧' },
      { name: 'Power Bank', emoji: '🔋' },
      { name: 'Laptop Stand', emoji: '💻' },
      { name: 'Mouse Pad', emoji: '🖱️' },
      { name: 'Keyboard', emoji: '⌨️' },
      { name: 'Webcam', emoji: '📷' },
    ],
  },
];

const statsCards = [
  {
    label: 'Total Wishlists',
    value: '456',
    icon: Heart,
    gradient: '#262626',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  {
    label: 'Total Items',
    value: '2,340',
    icon: ShoppingBag,
    gradient: '#000000',
    shadowColor: 'rgba(0,0,0,0.12)',
  },
  {
    label: 'Most Popular Product',
    value: 'Headphones',
    icon: TrendingUp,
    gradient: '#262626',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
  {
    label: 'Avg Items/User',
    value: '5.1',
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #0a0a0a 0%, #fafafa 100%)',
    shadowColor: 'rgba(0,0,0,0.3)',
  },
];

const avatarColors = [
  '#0a0a0a', '#525252', '#a3a3a3', '#525252', '#737373', '#0a0a0a',
];

function StatCard({ stat }) {
  const { colors } = useTheme();
  const Icon = stat.icon;

  return (
    <div
      style={{
        background: colors.bgCard,
        borderRadius: '16px',
        padding: '22px',
        border: `1px solid ${colors.border}`,
        flex: '1 1 200px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 20px 40px ${stat.shadowColor}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: stat.gradient, display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: `0 8px 20px ${stat.shadowColor}`,
        }}>
          <Icon size={22} color="#fff" strokeWidth={2} />
        </div>
      </div>
      <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500', marginBottom: '4px' }}>
        {stat.label}
      </p>
      <p style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
        {stat.value}
      </p>
    </div>
  );
}

export default function Wishlists() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredWishlists = wishlists.filter((w) =>
    w.user.toLowerCase().includes(search.toLowerCase()) ||
    w.products.some((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
          <Heart size={24} color={colors.accent} />
          <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>
            Wishlists
          </h1>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: colors.textSubtle }}>Customer wishlists overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {statsCards.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '20px', padding: '24px',
        border: `1px solid ${colors.border}`,
      }}>
        <div style={{ marginBottom: '20px', position: 'relative', maxWidth: '360px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
          <input
            type="text"
            placeholder="Search wishlists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px 10px 38px',
              borderRadius: '10px', border: `1px solid ${colors.border}`,
              background: colors.bgHover, color: colors.text,
              fontSize: '13px', outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.target.style.borderColor = colors.accent; }}
            onBlur={(e) => { e.target.style.borderColor = colors.border; }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '16px',
        }}>
          {filteredWishlists.map((wishlist, idx) => (
            <div
              key={wishlist.id}
              onMouseEnter={() => setHoveredCard(wishlist.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: colors.bgHover,
                borderRadius: '16px',
                padding: '22px',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredCard === wishlist.id ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredCard === wishlist.id ? `0 20px 40px rgba(0,0,0,0.08)` : 'none',
                cursor: 'default',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: avatarColors[idx % avatarColors.length],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '18px', fontWeight: '700',
                  flexShrink: 0,
                }}>
                  {wishlist.user.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: colors.text }}>
                    {wishlist.user}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>
                    {wishlist.items} items in wishlist
                  </p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '4px 10px', borderRadius: '20px',
                  background: colors.bgCard, border: `1px solid ${colors.border}`,
                }}>
                  <Heart size={12} color={colors.accent} fill={colors.accent} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: colors.text }}>
                    {wishlist.items}
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: '6px',
              }}>
                {wishlist.products.map((product, pIdx) => (
                  <div
                    key={pIdx}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 12px', borderRadius: '10px',
                      background: colors.bgCard, border: `1px solid ${colors.borderLight}`,
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{product.emoji}</span>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: colors.textSecondary }}>
                      {product.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredWishlists.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: colors.textMuted }}>
            <Users size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>No wishlists found</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px' }}>Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
