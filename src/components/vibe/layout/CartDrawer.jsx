import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useStorefront } from '../../../context/StorefrontContext';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useStorefront();
  const { items, removeFromCart, updateQuantity, cartTotal, shipping, grandTotal, FREE_SHIPPING_THRESHOLD } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add('vibe-lock');
    } else {
      document.body.classList.remove('vibe-lock');
    }
    return () => document.body.classList.remove('vibe-lock');
  }, [cartOpen]);

  const close = () => setCartOpen(false);

  const go = (path) => {
    close();
    navigate(path);
  };

  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
      />
      <aside
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col transition-transform duration-300 ease-out ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-5 border-b border-mist">
          <h2 className="text-lg font-bold text-ink uppercase tracking-wide">
            Your Bag ({items.length})
          </h2>
          <button
            className="p-2 text-ink hover:bg-mist rounded-full"
            onClick={close}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <p className="text-muted">Your bag is empty.</p>
            <button
              onClick={() => go('/shop')}
              className="mt-5 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-6 py-3 rounded-full hover:bg-black"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartTotal > 0 && cartTotal < FREE_SHIPPING_THRESHOLD && (
                <div className="mb-4 bg-mist rounded-lg p-3">
                  <p className="text-xs text-ink">
                    You're <strong>{formatCurrency(FREE_SHIPPING_THRESHOLD - cartTotal)}</strong> away from
                    free shipping!
                  </p>
                  <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-volt rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-ink line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted mt-0.5">
                            {item.size ? `Size: ${item.size}` : ''}
                            {item.color ? ` · ${item.color}` : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-muted hover:text-black"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-mist rounded-full">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="p-1.5 text-ink hover:bg-mist rounded-full"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="p-1.5 text-ink hover:bg-mist rounded-full"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-mist p-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-ink">{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-ink">
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-mist">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => go('/cart')}
                  className="bg-ink text-white text-[13px] font-semibold uppercase tracking-wide py-3.5 rounded-full hover:bg-black transition-colors"
                >
                  View Cart
                </button>
                <button
                  onClick={() => go('/checkout')}
                  className="bg-volt text-ink text-[13px] font-semibold uppercase tracking-wide py-3.5 rounded-full hover:bg-volt-dark transition-colors"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
