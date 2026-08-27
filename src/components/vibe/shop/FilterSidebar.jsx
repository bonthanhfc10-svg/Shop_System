import { useState } from 'react';
import { ChevronDown, ChevronUp, SlidersHorizontal, X, Check, Star } from 'lucide-react';
import { allColors, sizes } from '../../../data/products';

const priceRanges = [
  { label: 'Under $50', value: '0-50' },
  { label: '$50 - $100', value: '50-100' },
  { label: '$100 - $150', value: '100-150' },
  { label: 'Over $150', value: '150-' },
];

const brands = ['VIBE', 'VIBE Sport'];
const ratingOptions = [
  { label: '4.0 & up', value: '4' },
  { label: '4.5 & up', value: '4.5' },
];

const outlineSwatches = ['White', 'Grey'];

function FacetSection({ title, active, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const showDot = active;
  return (
    <div className="border-b border-mist py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-ink">{title}</span>
          {showDot && <span className="w-2 h-2 rounded-full bg-volt" />}
        </span>
        <span className="text-ink/50 group-hover:text-ink transition-colors">
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

function Chip({ label, active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] font-semibold uppercase tracking-wide border transition-all active:scale-95 ${
        active
          ? 'bg-ink text-white border-ink shadow-[0_2px_10px_rgba(0,0,0,0.18)]'
          : 'bg-white text-ink border-mist hover:border-ink'
      }`}
    >
      {children ?? label}
    </button>
  );
}

function RadioRow({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-2 text-sm text-ink hover:text-black transition-colors text-left group"
    >
      <span className="flex items-center gap-2.5">
        <span
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
            active ? 'border-ink' : 'border-mist group-hover:border-ink/40'
          }`}
        >
          {active && <span className="w-2.5 h-2.5 rounded-full bg-ink" />}
        </span>
        {label}
      </span>
    </button>
  );
}

export default function FilterSidebar({ filters, setFilter, saleOnly, setSaleOnly, onClear, hasFilters }) {
  const activeCount =
    Number(Boolean(filters.size)) +
    Number(Boolean(filters.color)) +
    Number(Boolean(filters.price)) +
    Number(Boolean(filters.brand)) +
    Number(Boolean(filters.rating)) +
    Number(saleOnly);

  return (
    <aside className="bg-white rounded-2xl border border-mist p-5">
      <div className="flex items-center justify-between pb-4 mb-2 border-b border-mist">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-ink" />
          <h2 className="text-lg font-bold text-ink uppercase tracking-wide">Filters</h2>
          {hasFilters && (
            <span className="ml-1 min-w-[20px] h-5 px-1.5 rounded-full bg-volt text-ink text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <button
          onClick={onClear}
          disabled={!hasFilters}
          className="text-[12px] font-semibold text-muted hover:text-black underline-offset-2 hover:underline transition-colors disabled:opacity-40 disabled:hover:no-underline"
        >
          Clear all
        </button>
      </div>

      <FacetSection title="Size" active={Boolean(filters.size)}>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => (
            <Chip
              key={s}
              active={filters.size === s}
              onClick={() => setFilter('size', filters.size === s ? '' : s)}
              label={s}
            />
          ))}
        </div>
      </FacetSection>

      <FacetSection title="Color" active={Boolean(filters.color)}>
        <div className="flex flex-wrap gap-2.5">
          {allColors.map((c) => {
            const active = filters.color === c.name;
            const needsOutline = outlineSwatches.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => setFilter('color', active ? '' : c.name)}
                style={{ background: c.hex }}
                aria-label={c.name}
                title={c.name}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                  needsOutline ? 'ring-1 ring-black/10' : ''
                } ${active ? 'ring-2 ring-offset-2 ring-ink scale-110' : ''}`}
              >
                {active && <Check size={14} strokeWidth={3} className={needsOutline ? 'text-ink' : 'text-white'} />}
              </button>
            );
          })}
        </div>
      </FacetSection>

      <FacetSection title="Price" active={Boolean(filters.price)}>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <Chip
              key={range.value}
              active={filters.price === range.value}
              onClick={() => setFilter('price', filters.price === range.value ? '' : range.value)}
              label={range.label}
            />
          ))}
        </div>
      </FacetSection>

      <FacetSection title="Brand" active={Boolean(filters.brand)}>
        <div className="space-y-1">
          {brands.map((brand) => (
            <RadioRow
              key={brand}
              label={brand}
              active={filters.brand === brand}
              onClick={() => setFilter('brand', filters.brand === brand ? '' : brand)}
            />
          ))}
        </div>
      </FacetSection>

      <FacetSection title="Rating" active={Boolean(filters.rating)}>
        <div className="space-y-1">
          {ratingOptions.map((rating) => (
            <button
              key={rating.value}
              onClick={() => setFilter('rating', filters.rating === rating.value ? '' : rating.value)}
              className={`w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-sm transition-all ${
                filters.rating === rating.value
                  ? 'bg-mist text-ink font-semibold'
                  : 'text-ink hover:bg-mist/60'
              }`}
            >
              <Star size={15} className={filters.rating === rating.value ? 'fill-volt text-volt' : 'text-muted'} />
              {rating.label}
            </button>
          ))}
        </div>
      </FacetSection>

      <div className="py-5">
        <button
          onClick={() => setSaleOnly(!saleOnly)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-semibold transition-all active:scale-[0.99] ${
            saleOnly
              ? 'bg-volt text-ink border-volt'
              : 'bg-white text-ink border-mist hover:border-ink'
          }`}
        >
          <span className="flex items-center gap-2.5">
            <span
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                saleOnly ? 'bg-ink border-ink text-volt' : 'border-mist text-transparent'
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </span>
            On Sale
          </span>
          {saleOnly && <X size={16} className="text-ink" />}
        </button>
      </div>
    </aside>
  );
}
