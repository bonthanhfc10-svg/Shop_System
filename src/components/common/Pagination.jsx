import { useTheme } from '../../hooks/useTheme';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { colors } = useTheme();

  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  const btnStyle = (active) => ({
    padding: '6px 12px',
    border: '1px solid',
    borderColor: active ? colors.accent : colors.borderInput,
    background: active ? colors.accent : colors.bgCard,
    color: active ? '#fff' : colors.textSecondary,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: active ? '600' : '400',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '20px' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} style={btnStyle(false)}>
        Prev
      </button>
      {getPages().map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} style={{ padding: '6px 8px', color: colors.textSubtle }}>...</span>
        ) : (
          <button key={page} onClick={() => onPageChange(page)} style={btnStyle(page === currentPage)}>
            {page}
          </button>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} style={btnStyle(false)}>
        Next
      </button>
    </div>
  );
}
