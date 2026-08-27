import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal, shipping } = useCart();
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();

  const discount = applied ? cartTotal * 0.1 : 0;

  if (items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-black uppercase text-ink">Your Cart is Empty</h1>
        <p className="mt-4 text-muted">Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-8 inline-flex items-center gap-2 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
        >
          Continue Shopping <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'VIBE10') {
      setApplied(true);
    }
  };

  let total = cartTotal - discount + shipping;

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-muted hover:text-black underline">Clear all</button>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
        {/* Items */}
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.key} className="flex gap-5 bg-white border border-mist rounded-2xl p-4">
              <Link to={`/product/${item.productId}`}>
                <img src={item.image} alt={item.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.productId}`} className="text-[15px] font-semibold text-ink hover:underline">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {item.category}
                      {item.size ? ` · Size ${item.size}` : ''}
                      {item.color ? ` · ${item.color}` : ''}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.key)} aria-label="Remove item" className="text-muted hover:text-black">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-mist rounded-full">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="px-3 py-2 text-ink hover:bg-mist rounded-full" aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="px-3 py-2 text-ink hover:bg-mist rounded-full" aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-base font-semibold text-ink">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 self-start bg-mist rounded-2xl p-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-ink mb-5">Order Summary</h2>

          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter promo code"
              aria-label="Promo code"
              className="flex-1 px-4 py-3 rounded-full border border-mist bg-white text-sm outline-none focus:border-ink"
            />
            <button
              onClick={applyCoupon}
              className="bg-ink text-white text-[12px] font-semibold uppercase tracking-wide px-5 rounded-full hover:bg-black"
            >
              Apply
            </button>
          </div>
          {applied && <p className="text-xs text-green-600 mb-4">Promo code VIBE10 applied — 10% off!</p>}
          {!applied && coupon && (
            <p className="text-xs text-muted mb-4">Tip: try code VIBE10</p>
          )}

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium text-ink">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Discount</span>
              <span className="font-medium text-green-600">-{formatCurrency(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span className="font-medium text-ink">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold pt-4 mt-4 border-t border-mist">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <Link to="/checkout" className="mt-6 block w-full bg-ink text-white text-center text-[13px] font-semibold uppercase tracking-wide py-4 rounded-full hover:bg-black">
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
