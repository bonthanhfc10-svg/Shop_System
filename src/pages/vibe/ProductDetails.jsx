import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { products, sizes as allSizes } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import Rating from '../../components/vibe/product/Rating';
import WishlistButton from '../../components/vibe/product/WishlistButton';
import ProductGrid from '../../components/vibe/product/ProductGrid';
import Button from '../../components/vibe/ui/Button';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-mist">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[13px] font-bold tracking-[0.15em] uppercase text-ink">{title}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pb-5 text-sm text-muted leading-relaxed">{children}</div>}
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = products.find((p) => p.id === Number(id));

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Reset selections whenever the product changes (adjust state during render).
  if (product && selectedProductId !== product.id) {
    setSelectedProductId(product.id);
    setSelectedSize(product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setQuantity(1);
  }

  const related = useMemo(
    () => products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4),
    [product]
  );

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-black text-ink uppercase">Product Not Found</h1>
        <Link to="/shop" className="inline-block mt-6 text-ink underline">Back to Shop</Link>
      </div>
    );
  }

  const requireLogin = () => {
    navigate('/login?redirect=' + encodeURIComponent(`/product/${product.id}`));
  };

  const handleAdd = () => {
    if (!user) return requireLogin();
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  const handleBuyNow = () => {
    if (!user) return requireLogin();
    addToCart(product, quantity, selectedSize, selectedColor);
    navigate('/checkout');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-6 flex items-center gap-1" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-ink">{product.category}</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="grid grid-cols-[1fr] gap-3">
          <div className="aspect-square overflow-hidden rounded-2xl bg-mist">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-muted">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl lg:text-4xl font-black uppercase tracking-tight text-ink leading-tight">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating rating={product.rating} reviews={product.reviews} />
            <span className="text-xs text-muted">· {product.reviews} reviews</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-2xl font-bold text-ink">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted line-through">{formatCurrency(product.oldPrice)}</span>
            )}
            {product.discount && (
              <span className="bg-volt text-ink text-[12px] font-bold px-2.5 py-1 rounded-full">
                -{product.discount}%
              </span>
            )}
          </div>

          <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-8">
            <p className="text-[13px] font-bold tracking-wider uppercase text-ink mb-3">
              Color: <span className="font-medium text-muted">{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((c) => {
                const color = { Black: '#111111', White: '#ffffff', Grey: '#9ca3af', Green: '#b6ff2e', Navy: '#1e3a8a', Olive: '#6b8f4e', Tan: '#d6b98c' }[c];
                const active = selectedColor === c;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Color ${c}`}
                    style={{ background: color }}
                    className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${active ? 'border-ink scale-110' : 'border-mist'}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <p className="text-[13px] font-bold tracking-wider uppercase text-ink mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  disabled={!product.sizes.includes(s)}
                  className={`w-12 h-12 rounded-full text-[13px] font-medium border transition-colors ${
                    selectedSize === s
                      ? 'bg-ink text-white border-ink'
                      : product.sizes.includes(s)
                        ? 'border-mist text-ink hover:border-ink'
                        : 'border-mist text-muted opacity-40 line-through cursor-not-allowed'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-mist rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 text-ink hover:bg-mist rounded-full"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 text-ink hover:bg-mist rounded-full"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <WishlistButton product={product} className="w-12 h-12" size={20} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="lg" fullWidth onClick={handleAdd}>
              Add to Cart
            </Button>
            <Button variant="accent" size="lg" fullWidth onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>

          {/* Accordions */}
          <div className="mt-10 border-b border-mist">
            <Accordion title="Details">{product.details}</Accordion>
            <Accordion title="Material">{product.material}</Accordion>
            <Accordion title="Shipping & Returns">
              Complimentary standard shipping on orders over $100. Estimated delivery 3–5 business days.
              Free 30-day returns on unworn items with original packaging.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20 lg:mt-28">
        <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-ink mb-8">
          You May Also Like
        </h2>
        <ProductGrid items={related.length ? related : products.slice(0, 4)} />
      </section>
    </div>
  );
}
