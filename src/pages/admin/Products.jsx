import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  Search, Plus, Edit2, Trash2, Package, Filter, ChevronLeft, ChevronRight,
} from 'lucide-react';

const fakeProducts = [
  { id: 1, name: 'Wireless Bluetooth Headphones', category: 'Electronics', price: 79.99, stock: 124, status: 'active', emoji: '🎧' },
  { id: 2, name: 'Smart Watch Pro', category: 'Electronics', price: 199.99, stock: 56, status: 'active', emoji: '⌚' },
  { id: 3, name: 'USB-C Hub Adapter', category: 'Accessories', price: 34.99, stock: 230, status: 'active', emoji: '🔌' },
  { id: 4, name: 'Laptop Stand Adjustable', category: 'Furniture', price: 45.99, stock: 89, status: 'active', emoji: '🖥️' },
  { id: 5, name: 'Mechanical Keyboard RGB', category: 'Electronics', price: 89.99, stock: 0, status: 'out of stock', emoji: '⌨️' },
  { id: 6, name: 'Wireless Mouse Ergonomic', category: 'Electronics', price: 39.99, stock: 145, status: 'active', emoji: '🖱️' },
  { id: 7, name: '4K Webcam HD', category: 'Electronics', price: 69.99, stock: 34, status: 'active', emoji: '📷' },
  { id: 8, name: 'Portable SSD 1TB', category: 'Accessories', price: 99.99, stock: 67, status: 'active', emoji: '💾' },
];

const categories = ['All', 'Electronics', 'Accessories', 'Furniture'];

const statusStyles = {
  active: { bg: '#dcfce7', text: '#166534', dot: '#22c55e' },
  'out of stock': { bg: '#fef2f2', text: '#991b1b', dot: '#ef4444' },
  draft: { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' },
};

const ITEMS_PER_PAGE = 5;

export default function Products() {
  const { colors } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);

  const filteredProducts = useMemo(() => {
    return fakeProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div style={{ padding: 'clamp(16px, 3vw, 32px)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        flexWrap: 'wrap', gap: '16px', marginBottom: '32px',
      }}>
        <div>
          <h1 style={{
            margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800',
            color: colors.text, letterSpacing: '-0.02em',
          }}>
            Products
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: colors.textMuted }}>
            Manage your product inventory
          </p>
        </div>
        <Link to="/admin/products/create" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '12px 24px', borderRadius: '12px',
          background: colors.gradientPrimary, color: '#fff',
          fontSize: '14px', fontWeight: '600', textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(79,70,229,0.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.35)'; }}
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div style={{
        display: 'flex', gap: '12px', flexWrap: 'wrap',
        marginBottom: '24px', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          flex: '1 1 280px', padding: '10px 16px',
          borderRadius: '12px', background: colors.bgInput,
          border: `1px solid ${colors.borderInput}`,
          transition: 'border-color 0.2s',
        }}>
          <Search size={18} color={colors.textSubtle} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              fontSize: '14px', color: colors.text, width: '100%',
            }}
          />
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color={colors.textSubtle} />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            style={{
              padding: '10px 36px 10px 14px', borderRadius: '12px',
              background: colors.bgInput, border: `1px solid ${colors.borderInput}`,
              fontSize: '14px', color: colors.text, cursor: 'pointer',
              outline: 'none', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%2364748b' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
        boxShadow: colors.shadowCard,
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr>
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((header) => (
                  <th key={header} style={{
                    textAlign: 'left', padding: '14px 20px',
                    fontSize: '12px', fontWeight: '600', color: colors.textMuted,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    borderBottom: `1px solid ${colors.border}`,
                    background: colors.bgBadge,
                  }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const badge = statusStyles[product.status] || statusStyles.draft;
                return (
                  <tr
                    key={product.id}
                    onMouseEnter={() => setHoveredRow(product.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === product.id ? colors.bgHover : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '44px', height: '44px', borderRadius: '12px',
                          background: colors.bgBadge, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                          flexShrink: 0,
                        }}>
                          {product.emoji}
                        </div>
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                            {product.name}
                          </p>
                          <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>
                            ID: {String(product.id).padStart(4, '0')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{
                        fontSize: '13px', fontWeight: '500', color: colors.textSecondary,
                      }}>
                        {product.category}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>
                        {formatCurrency(product.price)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontSize: '14px', fontWeight: '600',
                          color: product.stock === 0 ? colors.danger : colors.text,
                        }}>
                          {product.stock}
                        </span>
                        {product.stock === 0 && (
                          <Package size={14} color={colors.danger} />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: '600',
                        background: badge.bg, color: badge.text,
                      }}>
                        <span style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: badge.dot,
                        }} />
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', borderBottom: `1px solid ${colors.borderLight}` }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '36px', height: '36px', borderRadius: '10px',
                            border: `1px solid ${colors.border}`,
                            background: colors.bgCard, color: colors.accent,
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgCard; }}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '36px', height: '36px', borderRadius: '10px',
                            border: `1px solid ${colors.borderDanger}`,
                            background: colors.bgDanger, color: colors.danger,
                            cursor: 'pointer', transition: 'all 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center' }}>
                    <Package size={40} color={colors.textSubtle} style={{ marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.textSecondary }}>
                      No products found
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: colors.textMuted }}>
                      Try adjusting your search or filter criteria
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredProducts.length > ITEMS_PER_PAGE && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 20px', borderTop: `1px solid ${colors.borderLight}`,
            flexWrap: 'wrap', gap: '12px',
          }}>
            <span style={{ fontSize: '13px', color: colors.textMuted }}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of{' '}
              {filteredProducts.length} products
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  border: `1px solid ${colors.border}`, background: colors.bgCard,
                  color: currentPage === 1 ? colors.textSubtle : colors.text,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: 'all 0.15s',
                }}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '36px', height: '36px', borderRadius: '10px',
                    border: 'none',
                    background: page === currentPage ? colors.gradientPrimary : 'transparent',
                    color: page === currentPage ? '#fff' : colors.textSecondary,
                    fontSize: '13px', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '36px', height: '36px', borderRadius: '10px',
                  border: `1px solid ${colors.border}`, background: colors.bgCard,
                  color: currentPage === totalPages ? colors.textSubtle : colors.text,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  transition: 'all 0.15s',
                }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
