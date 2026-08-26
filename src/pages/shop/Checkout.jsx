import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  CreditCard, MapPin, User, Mail, Phone, Lock,
  Shield, CheckCircle2, ChevronRight,
} from 'lucide-react';

const demoItems = [
  { id: 1, name: 'Classic White T-Shirt', price: 19.99, quantity: 2, emoji: '👕' },
  { id: 2, name: 'Slim Fit Blue Jeans', price: 39.99, quantity: 1, emoji: '👖' },
  { id: 3, name: 'White Running Sneakers', price: 59.99, quantity: 1, emoji: '👟' },
];

const paymentMethods = [
  { id: 'credit', label: 'Credit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
];

export default function Checkout() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const subtotal = demoItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-success');
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text,
    boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px clamp(16px, 3vw, 32px)' }}>
      <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '700', color: colors.text }}>Checkout</h1>
      <p style={{ margin: '0 0 32px', fontSize: '14px', color: colors.textMuted }}>Complete your order</p>

      <div style={{
        display: 'flex', gap: '8px', marginBottom: '32px',
        justifyContent: 'center',
      }}>
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: step > i + 1 ? colors.success : step === i + 1 ? colors.accent : colors.bgHover,
              color: step > i + 1 || step === i + 1 ? '#fff' : colors.textMuted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: '700', flexShrink: 0,
            }}>
              {step > i + 1 ? <CheckCircle2 size={16} /> : i + 1}
            </div>
            <span className="hide-mobile" style={{
              fontSize: '13px', fontWeight: step === i + 1 ? '600' : '400',
              color: step === i + 1 ? colors.text : colors.textMuted,
            }}>
              {label}
            </span>
            {i < 2 && <ChevronRight size={14} color={colors.textSubtle} className="hide-mobile" />}
          </div>
        ))}
      </div>

      <div className="grid-2col-responsive" style={{ gap: '24px', alignItems: 'start' }}>
        <div style={{
          background: colors.bgCard, borderRadius: '16px',
          border: `1px solid ${colors.border}`, padding: '28px',
        }}>
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '700', color: colors.text }}>
                Shipping Information
              </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>First Name</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                    <User size={16} color={colors.textSubtle} />
                    <input name="firstName" value={form.firstName} onChange={handleChange} required style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Email</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                  <Mail size={16} color={colors.textSubtle} />
                  <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Phone</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                  <Phone size={16} color={colors.textSubtle} />
                  <input name="phone" value={form.phone} onChange={handleChange} required style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                  <MapPin size={16} color={colors.textSubtle} />
                  <input name="address" value={form.address} onChange={handleChange} required style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                </div>
              </div>
              <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>City</label>
                  <input name="city" value={form.city} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>State</label>
                  <input name="state" value={form.state} onChange={handleChange} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Zip Code</label>
                  <input name="zipCode" value={form.zipCode} onChange={handleChange} required style={inputStyle} />
                </div>
              </div>
              <button type="submit" style={{
                marginTop: '20px', width: '100%', padding: '12px', borderRadius: '10px',
                border: 'none', background: colors.gradientPrimary, color: '#fff',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
                Continue to Payment <ChevronRight size={16} />
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '700', color: colors.text }}>
                Payment Method
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {paymentMethods.map((method) => (
                  <label key={method.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${paymentMethod === method.id ? colors.accent : colors.border}`,
                    background: paymentMethod === method.id ? colors.bgAccent : colors.bgCard,
                    transition: 'all 0.15s',
                  }}>
                    <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} style={{ display: 'none' }} />
                    <span style={{ fontSize: '24px' }}>{method.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{method.label}</span>
                    {paymentMethod === method.id && <CheckCircle2 size={18} color={colors.accent} style={{ marginLeft: 'auto' }} />}
                  </label>
                ))}
              </div>

              {paymentMethod === 'credit' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Card Number</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                      <CreditCard size={16} color={colors.textSubtle} />
                      <input name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                    </div>
                  </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Expiry</label>
                      <input name="cardExpiry" placeholder="MM/YY" value={form.cardExpiry} onChange={handleChange} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>CVC</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', ...inputStyle }}>
                        <Lock size={16} color={colors.textSubtle} />
                        <input name="cardCvc" placeholder="123" value={form.cardCvc} onChange={handleChange} style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button onClick={() => setStep(1)} style={{
                  flex: 1, padding: '12px', borderRadius: '10px',
                  border: `1px solid ${colors.border}`, background: colors.bgCard,
                  color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                }}>
                  Back
                </button>
                <button onClick={() => setStep(3)} style={{
                  flex: 2, padding: '12px', borderRadius: '10px', border: 'none',
                  background: colors.gradientPrimary, color: '#fff',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                }}>
                  Review Order <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Review Your Order</h3>
              <div style={{ padding: '16px', borderRadius: '10px', background: colors.bgHover, marginBottom: '16px' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.textMuted, marginBottom: '6px' }}>Shipping To</p>
                <p style={{ margin: 0, fontSize: '14px', color: colors.text }}>
                  {form.firstName} {form.lastName} &mdash; {form.address || '123 Main St'}, {form.city || 'Phnom Penh'}, {form.state || 'Phnom Penh'} {form.zipCode || '12000'}
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: colors.bgHover, marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.textMuted, marginBottom: '6px' }}>Payment Method</p>
                <p style={{ margin: 0, fontSize: '14px', color: colors.text }}>
                  {paymentMethods.find((m) => m.id === paymentMethod)?.icon} {paymentMethods.find((m) => m.id === paymentMethod)?.label}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setStep(2)} style={{
                  flex: 1, padding: '12px', borderRadius: '10px',
                  border: `1px solid ${colors.border}`, background: colors.bgCard,
                  color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                }}>
                  Back
                </button>
                <button onClick={handleSubmit} style={{
                  flex: 2, padding: '14px', borderRadius: '10px', border: 'none',
                  background: '#0a0a0a', color: '#fff',
                  fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}>
                  <Shield size={16} /> Place Order &mdash; {formatCurrency(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{
          background: colors.bgCard, borderRadius: '16px',
          border: `1px solid ${colors.border}`, padding: '24px',
          position: 'sticky', top: '88px',
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {demoItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '500', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                  <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textMuted }}>Qty: {item.quantity}</p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: colors.textMuted }}>Subtotal</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{formatCurrency(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: colors.textMuted }}>Shipping</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: shipping === 0 ? colors.success : colors.text }}>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: colors.textMuted }}>Tax</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: colors.text }}>{formatCurrency(tax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}`, paddingTop: '12px', marginTop: '4px' }}>
              <span style={{ fontSize: '15px', fontWeight: '700', color: colors.text }}>Total</span>
              <span style={{ fontSize: '18px', fontWeight: '800', color: colors.accent }}>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
