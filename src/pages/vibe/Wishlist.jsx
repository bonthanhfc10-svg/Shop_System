import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatCurrency';
import Rating from '../../components/vibe/product/Rating';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-32 text-center">
        <Heart size={48} className="mx-auto text-muted" />
        <h1 className="mt-6 text-3xl font-black uppercase text-ink">Your Wishlist is Empty</h1>
        <p className="mt-3 text-muted">Save the pieces you love and find them here later.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-8 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
      <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink mb-8">
        Wishlist ({wishlist.length})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {wishlist.map((product) => (
          <div key={product.id} className="group flex flex-col bg-white">
            <Link
              to={`/product/${product.id}`}
              className="relative block aspect-square overflow-hidden rounded-xl bg-mist"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromWishlist(product.id);
                }}
                aria-label="Remove from wishlist"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform text-muted hover:text-black"
              >
                <Trash2 size={16} />
              </button>
            </Link>
            <div className="mt-3 flex flex-col gap-1">
              <span className="text-[11px] text-muted uppercase tracking-widest">{product.category}</span>
              <Link to={`/product/${product.id}`} className="text-[15px] font-medium text-ink hover:underline">
                {product.name}
              </Link>
              <Rating rating={product.rating} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[16px] font-bold text-ink">{formatCurrency(product.price)}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center gap-1.5 bg-ink text-white text-[11px] font-semibold uppercase tracking-wide px-3 py-2 rounded-full hover:bg-black"
                >
                  <ShoppingBag size={13} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
