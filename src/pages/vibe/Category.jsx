import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '../../data/products';
import { useProductFilters, applyFilters } from '../../hooks/useProductFilters';
import FilterSidebar from '../../components/vibe/shop/FilterSidebar';
import SortDropdown from '../../components/vibe/shop/SortDropdown';
import ProductGrid from '../../components/vibe/product/ProductGrid';

const descriptions = {
  shoes: 'Performance footwear engineered for the street, the gym and everything in between.',
  shirts: 'Premium essentials and statement tops built for everyday comfort and confidence.',
  pants: 'Tapered, relaxed and technical — bottoms designed to move with you.',
};

const categoryImages = {
  shoes: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1400&q=80',
  shirts: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80',
  pants: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1400&q=80',
};

export default function Category() {
  const { category } = useParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const cat = category.charAt(0).toUpperCase() + category.slice(1);

  const {
    setActiveCategory,
    sort,
    setSort,
    filters,
    setFilter,
    saleOnly,
    setSaleOnly,
    clearAll,
    hasFilters,
  } = useProductFilters('ALL');

  useEffect(() => {
    setActiveCategory(cat);
  }, [cat, setActiveCategory]);

  const filtered = useMemo(
    () => applyFilters(products, { activeCategory: cat, sort, filters, saleOnly }),
    [cat, sort, filters, saleOnly]
  );

  const resetFilters = () => clearAll();

  const filtersProps = { filters, setFilter, saleOnly, setSaleOnly, onClear: resetFilters, hasFilters };

  return (
    <div>
      {/* Category hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <img
          src={categoryImages[category] || categoryImages.shoes}
          alt={cat}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-20 lg:py-28">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tight">{cat}</h1>
          <p className="mt-4 max-w-lg text-white/80">
            {descriptions[category] || 'Explore the latest VIBE collection.'}
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
          <div className="hidden lg:block">
            <FilterSidebar {...filtersProps} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              </p>
              <div className="flex items-center gap-3">
                <button
                  className="lg:hidden flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide border border-mist rounded-full px-4 py-2.5"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <SortDropdown value={sort} onChange={setSort} />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-muted mb-4">No products match your filters.</p>
                <button
                  onClick={resetFilters}
                  className="bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-6 py-3 rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <ProductGrid items={filtered} />
            )}
          </div>
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 vibe-fade" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-white overflow-y-auto p-5 vibe-slide-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-ink uppercase tracking-wide">Filters</h2>
              <button onClick={() => setMobileFilterOpen(false)} className="text-ink text-2xl">×</button>
            </div>
            <FilterSidebar {...filtersProps} />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mt-6 w-full bg-ink text-white text-[13px] font-semibold uppercase tracking-wide py-3.5 rounded-full"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
