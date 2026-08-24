import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

function getPageWindow(page, totalPages) {
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  const pages = [];
  for (let i = start; i <= end; i += 1) pages.push(i);
  return pages;
}

export default function CategoryPagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  const { colors } = useTheme();

  if (totalItems === 0) return null;

  const rangeStart = (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalItems);
  const pages = getPageWindow(page, totalPages);

  const navButtonStyle = {
    width: '34px', height: '34px', borderRadius: '9px',
    border: `1px solid ${colors.border}`, background: colors.bgCard,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: colors.textSecondary,
    transition: 'all 0.15s', fontFamily: 'inherit',
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '12px', padding: '14px 16px',
      borderTop: `1px solid ${colors.borderLight}`,
    }}>
      <p style={{ margin: 0, fontSize: '12.5px', color: colors.textSubtle }}>
        Showing <span style={{ fontWeight: '600', color: colors.textMuted }}>{rangeStart}–{rangeEnd}</span> of{' '}
        <span style={{ fontWeight: '600', color: colors.textMuted }}>{totalItems}</span> categories
      </p>

      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            style={{ ...navButtonStyle, opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'default' : 'pointer' }}
            onMouseEnter={(e) => { if (page > 1) e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
          >
            <ChevronLeft size={16} />
          </button>

          {pages.map((p) => {
            const isCurrent = p === page;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                aria-label={`Page ${p}`}
                aria-current={isCurrent ? 'page' : undefined}
                style={{
                  ...navButtonStyle,
                  width: '34px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  ...(isCurrent
                    ? { background: colors.gradientPrimary, color: '#fff', borderColor: 'transparent' }
                    : {}),
                }}
                onMouseEnter={(e) => { if (!isCurrent) e.currentTarget.style.background = colors.bgHover; }}
                onMouseLeave={(e) => { if (!isCurrent) e.currentTarget.style.background = colors.bgCard; }}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            style={{ ...navButtonStyle, opacity: page === totalPages ? 0.4 : 1, cursor: page === totalPages ? 'default' : 'pointer' }}
            onMouseEnter={(e) => { if (page < totalPages) e.currentTarget.style.background = colors.bgHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
