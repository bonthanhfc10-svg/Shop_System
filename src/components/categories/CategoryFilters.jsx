import { useState, useEffect } from 'react';
import { Check, ChevronDown, Search, ArrowUpDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { SORT_OPTIONS } from '../../data/categoryData';

export default function CategoryFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  parentFilter,
  onParentChange,
  parentOptions,
  sortValue,
  onSortChange,
}) {
  const { colors } = useTheme();
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (!sortOpen) return undefined;
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-sort-menu]')) setSortOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sortOpen]);

  const activeSortLabel =
    (SORT_OPTIONS.find((option) => option.value === sortValue) || SORT_OPTIONS[0]).label;

  const controlStyle = {
    appearance: 'none',
    padding: '10px 36px 10px 14px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    background: colors.bgCard,
    color: colors.text,
    fontSize: '13px',
    fontWeight: '500',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
    fontFamily: 'inherit',
  };

  const selectWrapperStyle = {
    position: 'relative',
    flexShrink: 0,
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: '14px',
        padding: '12px 14px',
        marginBottom: '16px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div style={{
        position: 'relative',
        flex: '1 1 220px',
        minWidth: '180px',
      }}>
        <Search size={15} color={colors.textSubtle} style={{
          position: 'absolute', left: '13px', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search categories..."
          aria-label="Search categories"
          style={{
            width: '100%', padding: '10px 14px 10px 38px',
            borderRadius: '10px', border: `1px solid ${colors.border}`,
            background: colors.bgCard, color: colors.text,
            fontSize: '13px', outline: 'none', boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{ ...selectWrapperStyle, minWidth: '140px' }}>
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
          style={controlStyle}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>
        <ChevronDown size={14} color={colors.textSubtle} style={{
          position: 'absolute', right: '12px', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
      </div>

      <div style={{ ...selectWrapperStyle, minWidth: '160px' }}>
        <select
          value={parentFilter}
          onChange={(e) => onParentChange(e.target.value)}
          aria-label="Filter by parent category"
          style={controlStyle}
        >
          <option value="">All Parents</option>
          <option value="root">Main Category</option>
          {parentOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <ChevronDown size={14} color={colors.textSubtle} style={{
          position: 'absolute', right: '12px', top: '50%',
          transform: 'translateY(-50%)', pointerEvents: 'none',
        }} />
      </div>

      <div data-sort-menu style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setSortOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={sortOpen}
          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px', borderRadius: '10px',
            border: `1px solid ${colors.border}`, background: colors.bgCard,
            color: colors.textSecondary, fontSize: '13px', fontWeight: '500',
            cursor: 'pointer', transition: 'background 0.15s', fontFamily: 'inherit',
          }}
        >
          <ArrowUpDown size={15} />
          <span className="hide-mobile">{activeSortLabel}</span>
          <ChevronDown size={14} color={colors.textSubtle} style={{
            transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }} />
        </button>

        {sortOpen && (
          <div role="menu" style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            background: colors.bgModal, borderRadius: '12px',
            border: `1px solid ${colors.border}`, boxShadow: colors.shadowXl,
            minWidth: '190px', padding: '6px', zIndex: 50,
            animation: 'scaleIn 0.15s ease',
          }}>
            {SORT_OPTIONS.map((option) => {
              const isActive = option.value === sortValue;
              return (
                <button
                  key={option.value}
                  role="menuitem"
                  onClick={() => {
                    onSortChange(option.value);
                    setSortOpen(false);
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: '10px', width: '100%', padding: '9px 12px',
                    borderRadius: '8px', border: 'none', background: 'transparent',
                    color: isActive ? colors.accent : colors.textSecondary,
                    fontSize: '12.5px', fontWeight: isActive ? '600' : '500',
                    cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                  }}
                >
                  {option.label}
                  {isActive && <Check size={14} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
