import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Package, Tag, Star, ShoppingCart, CheckCircle2 } from 'lucide-react';

const notifications = [
  { id: 1, type: 'order', title: 'Order Shipped', message: 'Your order #ORD-7891 has been shipped!', time: '2 hours ago', read: false, icon: Package, color: '#10b981' },
  { id: 2, type: 'promo', title: 'Flash Sale!', message: 'Get 30% off on all electronics this weekend.', time: '5 hours ago', read: false, icon: Tag, color: '#f59e0b' },
  { id: 3, type: 'review', title: 'Review Reminder', message: 'How was your Smart Watch Pro? Leave a review!', time: '1 day ago', read: true, icon: Star, color: '#6366f1' },
  { id: 4, type: 'order', title: 'Order Confirmed', message: 'Your order #ORD-7890 has been confirmed.', time: '2 days ago', read: true, icon: CheckCircle2, color: '#10b981' },
  { id: 5, type: 'promo', title: 'New Arrivals', message: 'Check out our latest collection of accessories!', time: '3 days ago', read: true, icon: ShoppingCart, color: '#6366f1' },
];

export default function Notifications() {
  const { colors } = useTheme();
  const [items, setItems] = useState(notifications);

  const markAsRead = (id) => {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>Notifications</h1>
          {unreadCount > 0 && (
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>{unreadCount} unread notifications</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{
            padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`,
            background: colors.bgCard, color: colors.textSecondary,
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
          }}>
            Mark all as read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((notification) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '14px',
                padding: '16px 20px', background: notification.read ? colors.bgCard : colors.bgAccent,
                borderRadius: '12px', border: `1px solid ${notification.read ? colors.border : colors.accent}20`,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = notification.read ? colors.bgCard : colors.bgAccent; }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: `${notification.color}15`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color={notification.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{notification.title}</h4>
                  {!notification.read && (
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: colors.danger, flexShrink: 0,
                    }} />
                  )}
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSecondary }}>{notification.message}</p>
                <span style={{ fontSize: '11px', color: colors.textSubtle, marginTop: '4px', display: 'block' }}>{notification.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
