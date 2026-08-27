import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { sortOptions } from '../../../data/products';

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = sortOptions.find((o) => o.value === value) || sortOptions[0];

  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 bg-white border border-mist hover:border-ink rounded-full pl-4 pr-3 py-2.5 text-sm font-semibold text-ink transition-colors vibe-focus"
      >
        <ArrowUpDown size={15} className="text-muted" />
        <span className="hidden md:inline">Sort: {current.label}</span>
        <span className="md:hidden">Sort</span>
        <ChevronDown size={15} className={`text-ink transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-mist shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-20 vibe-fade-up"
        >
          {sortOptions.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                  active ? 'bg-mist text-ink font-semibold' : 'text-ink hover:bg-mist/60'
                }`}
              >
                {opt.label}
                {active && <Check size={16} className="text-ink" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
