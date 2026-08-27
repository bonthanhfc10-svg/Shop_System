import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Search, TrendingUp } from 'lucide-react';
import { useStorefront } from '../../../context/StorefrontContext';
import { products } from '../../../data/products';
import { formatCurrency } from '../../../utils/formatCurrency';

const POPULAR = ['Sneakers', 'Running Shoes', 'T-Shirts', 'Pants'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStorefront();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      document.body.classList.add('vibe-lock');
      const t = setTimeout(() => document.getElementById('vibe-search-input')?.focus(), 60);
      return () => {
        clearTimeout(t);
        document.body.classList.remove('vibe-lock');
      };
    }
    return undefined;
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) setQuery('');
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!searchOpen) return null;

  const selectPopular = (term) => {
    const clean = term.toLowerCase();
    const p = products.find(
      (x) => x.category.toLowerCase() === clean || x.name.toLowerCase().includes(clean)
    );
    if (p) {
      navigate('/shop', { state: { search: p.name } });
    } else {
      navigate('/shop');
    }
    setSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 vibe-fade" onClick={() => setSearchOpen(false)} />
      <div className="relative bg-white h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-5 py-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-ink uppercase tracking-wide">Search</h2>
            <button
              className="p-2 text-ink hover:bg-mist rounded-full"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center gap-3 border-b-2 border-ink pb-3">
            <Search size={22} className="text-ink" />
            <input
              id="vibe-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="flex-1 text-lg text-ink placeholder:text-muted outline-none bg-transparent"
            />
          </div>

          {!query && (
            <div className="mt-8">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-muted uppercase tracking-wider">
                <TrendingUp size={16} /> Popular searches
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    onClick={() => selectPopular(term)}
                    className="px-4 py-2 rounded-full border border-mist text-ink text-sm hover:bg-mist transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="text-muted text-center py-12">No products found.</p>
              ) : (
                <div className="flex flex-col divide-y divide-mist">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 py-3 hover:bg-mist/60 transition-colors rounded-lg px-2"
                    >
                      <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-ink">{p.name}</p>
                        <p className="text-xs text-muted uppercase tracking-wider">{p.category}</p>
                      </div>
                      <span className="text-sm font-semibold text-ink">{formatCurrency(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
