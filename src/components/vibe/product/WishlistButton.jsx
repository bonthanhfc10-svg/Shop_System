import { Heart } from 'lucide-react';
import { useWishlist } from '../../../hooks/useWishlist';

export default function WishlistButton({ product, size = 18, className = '' }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={active}
      className={`flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 vibe-focus ${className}`}
      style={{
        background: 'rgba(255,255,255,0.9)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
      }}
    >
      <Heart
        size={size}
        color={active ? '#e0245e' : '#111111'}
        fill={active ? '#e0245e' : 'none'}
      />
    </button>
  );
}
