import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, ChevronLeft } from 'lucide-react';

export default function CartPage() {
  const { colors } = useTheme();
  const { items, updateQuantity, removeFromCart } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px clamp(16px, 3vw, 32px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: '28px', fontWeight: '700', color: colors.text }}>
        Shopping Cart ({items.length})
      </h1>

      {items.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 20px',
          background: colors.bgCard, borderRadius: '16px',
          border: `1px solid ${colors.border}`,
        }}>
          <ShoppingBag size={48} color={colors.textSubtle} style={{ marginBottom: '16px' }} />
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: colors.text }}>Your cart is empty</h3>
          <p style={{ margin: '8px 0 20px', fontSize: '14px', color: colors.textMuted }}>Add some products to get started</p>
          <Link to="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 24px', borderRadius: '10px', textDecoration: 'none',
            background: colors.gradientPrimary, color: '#fff',
            fontSize: '14px', fontWeight: '600',
          }}>
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid-2col-responsive" style={{ gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {items.map((item) => (
              <div key={item.productId} className="cart-item-responsive" style={{
                display: 'flex', gap: '16px', padding: 'clamp(12px, 2vw, 16px)',
                background: colors.bgCard, borderRadius: '14px',
                border: `1px solid ${colors.border}`, alignItems: 'center',
                transition: 'all 0.2s',
              }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '12px',
                  background: colors.bgBadge, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '36px',
                  flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/shop/${item.productId}`} style={{ textDecoration: 'none' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.text }}>{item.name}</h4>
                  </Link>
                  <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: '700', color: colors.accent }}>
                    {formatCurrency(item.price)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '8px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden', width: 'fit-content' }}>
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={{
                      width: '32px', height: '32px', border: 'none', background: colors.bgHover,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ width: '36px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={{
                      width: '32px', height: '32px', border: 'none', background: colors.bgHover,
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text }}>
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <button onClick={() => removeFromCart(item.productId)} style={{
                    marginTop: '8px', background: 'none', border: 'none',
                    cursor: 'pointer', color: colors.danger, padding: '4px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '12px', fontWeight: '500',
                  }}>
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: colors.bgCard, borderRadius: '16px',
            border: `1px solid ${colors.border}`, padding: '24px',
            position: 'sticky', top: '88px',
          }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Order Summary</h3>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '20px',
            }}>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 14px', borderRadius: '10px',
                background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
              }}>
                <Tag size={16} color={colors.textSubtle} />
                <input
                  type="text"
                  placeholder="Coupon code"
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontSize: '13px', color: colors.text, width: '100%',
                  }}
                />
              </div>
              <button style={{
                padding: '10px 16px', borderRadius: '10px', border: `1px solid ${colors.accent}`,
                background: 'transparent', color: colors.accent,
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}>
                Apply
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Subtotal', value: formatCurrency(subtotal) },
                { label: 'Shipping', value: shipping === 0 ? 'Free' : formatCurrency(shipping) },
                { label: 'Tax (8%)', value: formatCurrency(tax) },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0', borderTop: `1px solid ${colors.border}`,
              marginBottom: '20px',
            }}>
              <span style={{ fontSize: '16px', fontWeight: '700', color: colors.text }}>Total</span>
              <span style={{ fontSize: '22px', fontWeight: '800', color: colors.accent }}>{formatCurrency(total)}</span>
            </div>

            {shipping > 0 && (
              <p style={{
                margin: '0 0 16px', padding: '10px', borderRadius: '8px',
                background: colors.bgSuccess, color: colors.success,
                fontSize: '12px', fontWeight: '500', textAlign: 'center',
              }}>
                Add {formatCurrency(50 - subtotal)} more for free shipping!
              </p>
            )}

            <Link to="/checkout" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '14px', borderRadius: '12px', textDecoration: 'none',
              background: colors.gradientPrimary, color: '#fff',
              fontSize: '15px', fontWeight: '700',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              transition: 'all 0.25s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <Link to="/shop" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              marginTop: '12px', fontSize: '13px', color: colors.textMuted,
              textDecoration: 'none', transition: 'color 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
            >
              <ChevronLeft size={14} /> Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
