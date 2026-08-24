import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ChevronLeft, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

const ordersData = {
  'ORD-7891': { id: 'ORD-7891', date: '2026-08-16', status: 'delivered', total: 129.99, items: [{ name: 'Wireless Bluetooth Headphones', price: 79.99, qty: 1, emoji: '🎧' }, { name: 'USB-C Hub Adapter', price: 34.99, qty: 1, emoji: '🔌' }, { name: 'Desk Lamp LED', price: 15.01, qty: 1, emoji: '💡' }], shipping: { address: '123 Main St, Phnom Penh', method: 'Standard', tracking: 'TRK-98765' } },
  'ORD-7890': { id: 'ORD-7890', date: '2026-08-14', status: 'shipped', total: 89.50, items: [{ name: 'Smart Watch Pro', price: 199.99, qty: 1, emoji: '⌚' }, { name: 'USB-C Hub Adapter', price: 34.99, qty: 1, emoji: '🔌' }], shipping: { address: '456 Oak Ave, Siem Reap', method: 'Express', tracking: 'TRK-12345' } },
  'ORD-7889': { id: 'ORD-7889', date: '2026-08-12', status: 'processing', total: 45.00, items: [{ name: 'Laptop Stand Adjustable', price: 45.99, qty: 1, emoji: '🖥️' }], shipping: { address: '789 Pine Rd, Battambang', method: 'Standard', tracking: null } },
};

const steps = [
  { label: 'Order Placed', icon: Clock, done: true },
  { label: 'Processing', icon: Package, done: true },
  { label: 'Shipped', icon: Truck, done: false },
  { label: 'Delivered', icon: CheckCircle2, done: false },
];

export default function UserOrderDetails() {
  const { id } = useParams();
  const { colors } = useTheme();
  const order = ordersData[id] || ordersData['ORD-7891'];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <Link to="/user/orders" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        fontSize: '14px', color: colors.textMuted, textDecoration: 'none', marginBottom: '16px',
      }}>
        <ChevronLeft size={16} /> Back to Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: colors.text }}>Order {order.id}</h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textMuted }}>Placed on {formatDate(order.date)}</p>
        </div>
        <span style={{
          padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
          textTransform: 'capitalize', background: order.status === 'delivered' ? '#dcfce7' : order.status === 'shipped' ? '#ecfdf5' : '#fffbeb',
          color: order.status === 'delivered' ? '#166534' : order.status === 'shipped' ? '#047857' : '#b45309',
        }}>
          {order.status}
        </span>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '24px', marginBottom: '20px',
      }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Order Progress</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '18px', left: '40px', right: '40px', height: '2px', background: colors.border }} />
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = i <= (order.status === 'delivered' ? 3 : order.status === 'shipped' ? 2 : order.status === 'processing' ? 1 : 0);
            return (
              <div key={step.label} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: isActive ? colors.accent : colors.bgHover,
                  color: isActive ? '#fff' : colors.textSubtle,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', border: `2px solid ${isActive ? colors.accent : colors.border}`,
                }}>
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600', color: isActive ? colors.text : colors.textMuted }}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '24px', marginBottom: '20px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Items</h3>
        {order.items.map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 0', borderBottom: i < order.items.length - 1 ? `1px solid ${colors.borderLight}` : 'none',
          }}>
            <span style={{ fontSize: '28px' }}>{item.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{item.name}</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>Qty: {item.qty}</p>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{formatCurrency(item.price * item.qty)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', marginTop: '8px', borderTop: `1px solid ${colors.border}` }}>
          <span style={{ fontSize: '15px', fontWeight: '700', color: colors.text }}>Total</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: colors.accent }}>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Shipping Details</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MapPin size={16} color={colors.accent} />
          <span style={{ fontSize: '14px', color: colors.textSecondary }}>{order.shipping.address}</span>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: colors.textMuted }}>
          Method: {order.shipping.method} {order.shipping.tracking ? `| Tracking: ${order.shipping.tracking}` : ''}
        </p>
      </div>
    </div>
  );
}
