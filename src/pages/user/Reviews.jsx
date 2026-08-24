import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Star, Edit2 } from 'lucide-react';

const reviews = [
  { id: 1, product: 'Wireless Bluetooth Headphones', productId: 1, rating: 5, comment: 'Amazing sound quality and comfortable fit!', date: '2026-08-15', emoji: '🎧' },
  { id: 2, product: 'Smart Watch Pro', productId: 2, rating: 4, comment: 'Great watch but battery could last longer.', date: '2026-08-10', emoji: '⌚' },
  { id: 3, product: 'USB-C Hub Adapter', productId: 3, rating: 4, comment: 'Works perfectly with my MacBook.', date: '2026-08-05', emoji: '🔌' },
  { id: 4, product: 'Portable SSD 1TB', productId: 7, rating: 5, comment: 'Lightning fast transfer speeds!', date: '2026-07-28', emoji: '💾' },
];

export default function UserReviews() {
  const { colors } = useTheme();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700', color: colors.text }}>My Reviews</h1>

      {reviews.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 20px',
          background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        }}>
          <Star size={48} color={colors.textSubtle} style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.text }}>No reviews yet</h3>
          <p style={{ margin: '8px 0 0', fontSize: '14px', color: colors.textMuted }}>Share your thoughts on products you've purchased</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{
              display: 'flex', gap: '16px', padding: '20px',
              background: colors.bgCard, borderRadius: '14px',
              border: `1px solid ${colors.border}`,
            }}>
              <Link to={`/shop/${review.productId}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: colors.bgBadge, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0,
                }}>
                  {review.emoji}
                </div>
              </Link>
              <div style={{ flex: 1 }}>
                <Link to={`/shop/${review.productId}`} style={{ textDecoration: 'none' }}>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.text }}>{review.product}</h4>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', margin: '6px 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? '#f59e0b' : 'none'} color={i < review.rating ? '#f59e0b' : colors.borderInput} />
                  ))}
                </div>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.5' }}>
                  {review.comment}
                </p>
                <span style={{ fontSize: '12px', color: colors.textSubtle }}>{review.date}</span>
              </div>
              <button style={{
                padding: '6px 12px', borderRadius: '6px',
                border: `1px solid ${colors.border}`, background: colors.bgCard,
                color: colors.textMuted, fontSize: '12px', fontWeight: '500',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                alignSelf: 'flex-start',
              }}>
                <Edit2 size={12} /> Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
