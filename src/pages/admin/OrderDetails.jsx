import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { ChevronLeft, Package, Truck, CheckCircle2, Clock, MapPin, User, Mail, Phone, Edit2 } from 'lucide-react';

const ordersData = {
  'ORD-7891': { id: 'ORD-7891', customer: 'John Doe', email: 'john@example.com', phone: '+855 12 345 6789', date: '2026-08-16', status: 'delivered', total: 129.99, shipping: 0, tax: 10.40, items: [{ name: 'Wireless Bluetooth Headphones', price: 79.99, qty: 1, emoji: '🎧' }, { name: 'USB-C Hub Adapter', price: 34.99, qty: 1, emoji: '🔌' }, { name: 'Desk Lamp LED', price: 15.01, qty: 1, emoji: '💡' }], address: '123 Main St, Phnom Penh, Cambodia', payment: 'Credit Card (****4242)' },
  'ORD-7890': { id: 'ORD-7890', customer: 'Jane Smith', email: 'jane@example.com', phone: '+855 98 765 4321', date: '2026-08-16', status: 'processing', total: 89.50, shipping: 9.99, tax: 7.16, items: [{ name: 'Smart Watch Pro', price: 199.99, qty: 1, emoji: '⌚' }], address: '456 Oak Ave, Siem Reap, Cambodia', payment: 'PayPal' },
};

const steps = [
  { label: 'Pending', icon: Clock },
  { label: 'Confirmed', icon: Package },
  { label: 'Processing', icon: Package },
  { label: 'Shipped', icon: Truck },
  { label: 'Delivered', icon: CheckCircle2 },
];

export default function OrderDetails() {
  const { id } = useParams();
  const { colors } = useTheme();
  const order = ordersData[id] || ordersData['ORD-7891'];

  const currentStep = order.status === 'delivered' ? 4 : order.status === 'shipped' ? 3 : order.status === 'processing' ? 2 : order.status === 'confirmed' ? 1 : 0;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <Link to="/admin/orders" style={{
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
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{
            padding: '8px 16px', borderRadius: '8px', border: `1px solid ${colors.border}`,
            background: colors.bgCard, color: colors.textSecondary,
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <Edit2 size={14} /> Update Status
          </button>
        </div>
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
            const isActive = i <= currentStep;
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
                <span style={{ fontSize: '10px', fontWeight: '600', color: isActive ? colors.text : colors.textMuted }}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-1fr-1fr-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div style={{
          background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
          padding: '24px',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Customer Info</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { icon: User, label: order.customer },
              { icon: Mail, label: order.email },
              { icon: Phone, label: order.phone },
              { icon: MapPin, label: order.address },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={colors.accent} />
                  <span style={{ fontSize: '13px', color: colors.textSecondary }}>{item.label}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '16px', padding: '12px', borderRadius: '8px', background: colors.bgHover }}>
            <span style={{ fontSize: '12px', color: colors.textMuted }}>Payment: </span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{order.payment}</span>
          </div>
        </div>

        <div style={{
          background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
          padding: '24px',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: colors.text }}>Order Items</h3>
          {order.items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 0', borderBottom: i < order.items.length - 1 ? `1px solid ${colors.borderLight}` : 'none',
            }}>
              <span style={{ fontSize: '24px' }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.text }}>{item.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>Qty: {item.qty}</p>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{formatCurrency(item.price * item.qty)}</span>
            </div>
          ))}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Subtotal', value: formatCurrency(order.total - order.shipping - order.tax) },
              { label: 'Shipping', value: order.shipping === 0 ? 'Free' : formatCurrency(order.shipping) },
              { label: 'Tax', value: formatCurrency(order.tax) },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: colors.textMuted }}>{row.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}`, paddingTop: '10px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: colors.text }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: colors.accent }}>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
