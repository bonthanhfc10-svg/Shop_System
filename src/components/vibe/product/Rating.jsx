import { Star } from 'lucide-react';

export default function Rating({ rating, reviews, color = '#111111' }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            className={i <= Math.round(rating) ? 'fill-current' : 'stroke-current'}
            color={i <= Math.round(rating) ? color : '#c9c9c9'}
          />
        ))}
      </div>
      <span className="text-xs text-muted font-medium">
        {rating}
        {reviews != null && <span className="ml-1">({reviews})</span>}
      </span>
    </div>
  );
}
