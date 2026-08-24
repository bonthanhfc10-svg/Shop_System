import { Eye, EyeOff, Edit2, Trash2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import EmptyState from '../common/EmptyState';
import { getParentLabel } from '../../data/categoryData';

function StatusBadge({ status }) {
  const { colors } = useTheme();
  const isActive = status === 'active';

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
      textTransform: 'capitalize',
      ...(isActive
        ? { background: colors.bgSuccess, color: colors.success, border: `1px solid ${colors.success}30` }
        : { background: colors.bgDanger, color: colors.danger, border: `1px solid ${colors.borderDanger}` }),
    }}>
      {isActive ? (
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
      ) : (
        <EyeOff size={12} />
      )}
      {status}
    </span>
  );
}

function CategoryThumb({ category, size = 44 }) {
  return (
    <div style={{
      width: `${size}px`, height: `${size}px`, borderRadius: '12px', flexShrink: 0,
      background: category.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: `${Math.round(size * 0.45)}px`, border: `1px solid ${category.bg}`,
    }}>
      {category.emoji || '🏷️'}
    </div>
  );
}

function ActionButtons({ onView, onEdit, onDelete }) {
  const { colors } = useTheme();

  const baseStyle = {
    width: '32px', height: '32px', borderRadius: '8px',
    border: `1px solid ${colors.border}`, background: colors.bgCard,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.15s',
  };

  return (
    <>
      <button onClick={onView} style={baseStyle} aria-label="View category" title="View"
        onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.borderColor = colors.accent; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; e.currentTarget.style.borderColor = colors.border; }}
      >
        <Eye size={14} color={colors.accent} />
      </button>
      <button onClick={onEdit} style={baseStyle} aria-label="Edit category" title="Edit"
        onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.borderColor = colors.accent; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; e.currentTarget.style.borderColor = colors.border; }}
      >
        <Edit2 size={14} color={colors.accent} />
      </button>
      <button onClick={onDelete} style={baseStyle} aria-label="Delete category" title="Delete"
        onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f0f0'; e.currentTarget.style.borderColor = '#e5e5e5'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; e.currentTarget.style.borderColor = colors.border; }}
      >
        <Trash2 size={14} color="#0a0a0a" />
      </button>
    </>
  );
}

const columns = ['Image', 'Category', 'Slug', 'Parent Category', 'Products', 'Status', 'Actions'];

export default function CategoryTable({ categories, categoriesAll, isMobile, hasActiveFilters, onView, onEdit, onDelete, onClearFilters }) {
  const { colors } = useTheme();

  if (categories.length === 0) {
    return (
      <div>
        <EmptyState
          icon={hasActiveFilters ? '🔍' : '🗂️'}
          title={hasActiveFilters ? 'No matching categories' : 'No categories yet'}
          description={
            hasActiveFilters
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first category to start organizing products.'
          }
        />
        {hasActiveFilters && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0 20px 44px', marginTop: '-28px' }}>
            <button
              onClick={onClearFilters}
              style={{
                padding: '9px 18px', borderRadius: '10px', border: `1px solid ${colors.border}`,
                background: colors.bgCard, color: colors.accent,
                fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    );
  }

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {categories.map((category) => (
          <div key={category.id} style={{
            background: colors.bgCard, borderRadius: '14px', padding: '16px',
            border: `1px solid ${colors.border}`, animation: 'fadeIn 0.25s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <CategoryThumb category={category} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {category.name}
                </p>
                <code style={{ fontSize: '11.5px', color: colors.textSubtle, fontFamily: 'monospace' }}>
                  /{category.slug}
                </code>
              </div>
              <StatusBadge status={category.status} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: '12px', borderTop: `1px solid ${colors.borderLight}`,
            }}>
              <div style={{ display: 'flex', gap: '18px' }}>
                <div>
                  <p style={{ margin: 0, fontSize: '10.5px', color: colors.textSubtle, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Parent</p>
                  <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted }}>{getParentLabel(categoriesAll, category.parentId)}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10.5px', color: colors.textSubtle, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Products</p>
                  <p style={{ margin: 0, fontSize: '12.5px', fontWeight: '600', color: colors.text }}>{category.products}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <ActionButtons onView={() => onView(category)} onEdit={() => onEdit(category)} onDelete={() => onDelete(category)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', minWidth: '880px' }}>
        <thead>
          <tr>
            {columns.map((header) => (
              <th key={header} style={{
                textAlign: 'left', padding: '13px 16px',
                fontSize: '11.5px', fontWeight: '600', color: colors.textSubtle,
                textTransform: 'uppercase', letterSpacing: '0.06em',
                borderBottom: `1px solid ${colors.border}`,
                background: colors.bgHover,
              }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} style={{
              borderBottom: `1px solid ${colors.borderLight}`,
              transition: 'background 0.15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <td style={{ padding: '12px 16px' }}>
                <CategoryThumb category={category} />
              </td>
              <td style={{ padding: '12px 16px', maxWidth: '240px' }}>
                <p style={{ margin: 0, fontSize: '13.5px', fontWeight: '600', color: colors.text }}>
                  {category.name}
                </p>
                <p style={{
                  margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {category.description}
                </p>
              </td>
              <td style={{ padding: '12px 16px' }}>
                <code style={{
                  fontSize: '12px', padding: '4px 10px', borderRadius: '8px',
                  background: colors.bgBadge, color: colors.textMuted, fontFamily: 'monospace',
                }}>
                  /{category.slug}
                </code>
              </td>
              <td style={{ padding: '12px 16px', color: colors.textMuted }}>
                {getParentLabel(categoriesAll, category.parentId)}
              </td>
              <td style={{ padding: '12px 16px', fontWeight: '700', color: colors.text }}>
                {category.products}
              </td>
              <td style={{ padding: '12px 16px' }}>
                <StatusBadge status={category.status} />
              </td>
              <td style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <ActionButtons onView={() => onView(category)} onEdit={() => onEdit(category)} onDelete={() => onDelete(category)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
