import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '../../data/products';
import { useProductFilters, applyFilters } from '../../hooks/useProductFilters';
import FilterSidebar from '../../components/vibe/shop/FilterSidebar';
import SortDropdown from '../../components/vibe/shop/SortDropdown';
import ProductGrid from '../../components/vibe/product/ProductGrid';

const tabs = ['ALL', 'SHOES', 'SHIRTS', 'PANTS'];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const {
    activeCategory,
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

  // Apply URL params (from nav links like sale, sort, gender).
  useEffect(() => {
    if (searchParams.get('sale') === 'true') setSaleOnly(true);
    const sortParam = searchParams.get('sort');
    if (sortParam) setSort(sortParam);
  }, [searchParams, setSaleOnly, setSort]);

  const filtered = useMemo(
    () => applyFilters(products, { activeCategory, sort, filters, saleOnly }),
    [activeCategory, sort, filters, saleOnly]
  );

  const resetFilters = () => {
    clearAll();
  };

  const filtersProps = {
    filters,
    setFilter,
    saleOnly,
    setSaleOnly,
    onClear: resetFilters,
    hasFilters,
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
      <header className="mb-8 lg:mb-12">
        <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink">Shop</h1>
        <p className="mt-3 text-muted">Explore the latest VIBE collection.</p>
      </header>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto vibe-no-scrollbar mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`px-6 py-2.5 rounded-full text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
              activeCategory === tab ? 'bg-ink text-white' : 'bg-mist text-ink hover:bg-mist/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar {...filtersProps} />
        </div>

        <div>
          {/* Toolbar */}
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

      {/* Mobile filter drawer */}
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
