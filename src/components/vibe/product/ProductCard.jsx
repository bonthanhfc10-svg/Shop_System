import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useAuth } from '../../../hooks/useAuth';
import { formatCurrency } from '../../../utils/formatCurrency';
import WishlistButton from './WishlistButton';
import Rating from './Rating';

const badges = {
  isNew: 'NEW',
  isBestSeller: 'BEST SELLER',
  isSale: 'SALE',
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const badge = product.isSale
    ? badges.isSale
    : product.isNew
      ? badges.isNew
      : product.isBestSeller
        ? badges.isBestSeller
        : null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(`/product/${product.id}`));
      return;
    }
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col bg-white">
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden bg-mist rounded-xl"
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        </div>

        {product.discount && (
          <span className="absolute top-3 left-3 bg-volt text-ink text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide">
            -{product.discount}%
          </span>
        )}
        {badge && !product.discount && (
          <span className="absolute top-3 left-3 bg-ink text-white text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide">
            {badge}
          </span>
        )}

        <WishlistButton
          product={product}
          className="absolute top-3 right-3 w-9 h-9"
        />

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          <button
            onClick={handleAdd}
            className="w-full bg-ink text-white text-[12px] font-semibold uppercase tracking-wider py-3 rounded-full hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <span className="text-[11px] text-muted uppercase tracking-widest font-medium">
          {product.category}
        </span>
        <Link
          to={`/product/${product.id}`}
          className="text-[15px] font-medium text-ink hover:underline underline-offset-2"
        >
          {product.name}
        </Link>
        <Rating rating={product.rating} reviews={product.reviews} />
        <div className="flex items-center gap-2 mt-1" onClick={() => navigate(`/product/${product.id}`)}>
          <span className="text-[16px] font-bold text-ink">
            {formatCurrency(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
