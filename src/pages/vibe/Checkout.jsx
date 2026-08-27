import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatCurrency } from '../../utils/formatCurrency';

const inputClass =
  'w-full px-4 py-3 border border-mist rounded-lg text-sm outline-none focus:border-ink bg-white transition-colors';

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="block text-[12px] font-semibold uppercase tracking-wide text-ink mb-1.5">{label}</span>
      <input className={inputClass} {...props} />
    </label>
  );
}

function Section({ step, title, children }) {
  return (
    <div className="border border-mist rounded-2xl p-6">
      <h2 className="flex items-center gap-3 text-lg font-bold uppercase tracking-wide text-ink mb-5">
        <span className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm">{step}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, shipping, grandTotal } = useCart();
  const { user } = useAuth();
  const [placed, setPlaced] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-ink">Order Placed!</h1>
        <p className="mt-4 text-muted">Thank you for your order. A confirmation email is on its way.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-8 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-black uppercase text-ink">Your Cart is Empty</h1>
        <button
          onClick={() => navigate('/shop')}
          className="mt-8 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-volt flex items-center justify-center text-ink mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-ink">Login to Checkout</h1>
        <p className="mt-4 text-muted max-w-sm mx-auto">
          Please sign in to your account before placing your order.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/login?redirect=/checkout"
            className="bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
          >
            Sign In
          </Link>
          <Link
            to="/register?redirect=/checkout"
            className="border border-ink text-ink text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-mist"
          >
            Create Account
          </Link>
        </div>
        <Link to="/cart" className="inline-block mt-8 text-sm text-muted hover:text-black underline">
          Back to Cart
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
      <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-10">Checkout</h1>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
        <div className="space-y-6">
          <Section step={1} title="Contact Information">
            <Field label="Email" type="email" placeholder="you@example.com" required />
          </Section>

          <Section step={2} title="Shipping Address">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First Name" required />
              <Field label="Last Name" required />
              <Field label="Address" className={inputClass} required placeholder="Street address" />
              <Field label="City" required />
              <Field label="Country" required />
              <Field label="Phone" type="tel" required />
            </div>
          </Section>

          <Section step={3} title="Payment">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Card Number" placeholder="1234 5678 9012 3456" required className="sm:col-span-2" />
              <Field label="Expiry" placeholder="MM / YY" required />
              <Field label="CVV" placeholder="123" required type="password" />
            </div>
          </Section>
        </div>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-28 self-start bg-mist rounded-2xl p-6">
          <h2 className="text-lg font-bold uppercase tracking-wide text-ink mb-5">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted">
                    Qty {item.quantity}
                    {item.size ? ` · ${item.size}` : ''}
                  </p>
                </div>
                <span className="text-sm font-semibold text-ink">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-mist pt-4">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="font-medium text-ink">{formatCurrency(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span className="font-medium text-ink">{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-3 border-t border-mist">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-ink text-white text-[13px] font-semibold uppercase tracking-wide py-4 rounded-full hover:bg-black"
          >
            Place Order
          </button>
          <p className="text-center text-[11px] text-muted mt-3">
            This is a UI demonstration — no real payment is processed.
          </p>
        </aside>
      </form>
    </div>
  );
}
