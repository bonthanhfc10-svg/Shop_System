import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import {
  Package, Search, Eye, ChevronLeft, ChevronRight, Plus, Pencil, Trash2,
  X, AlertTriangle,
} from 'lucide-react';

const initialOrders = [
  { id: 'ORD-7891', date: '2026-08-16', items: 3, total: 129.99, status: 'delivered', note: '' },
  { id: 'ORD-7890', date: '2026-08-14', items: 2, total: 89.50, status: 'shipped', note: '' },
  { id: 'ORD-7889', date: '2026-08-12', items: 1, total: 45.00, status: 'processing', note: '' },
  { id: 'ORD-7888', date: '2026-08-10', items: 4, total: 256.75, status: 'pending', note: '' },
  { id: 'ORD-7887', date: '2026-08-08', items: 2, total: 198.00, status: 'delivered', note: '' },
  { id: 'ORD-7886', date: '2026-08-05', items: 1, total: 34.99, status: 'cancelled', note: '' },
];

const statusStyles = {
  pending: { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b' },
  processing: { bg: '#eef2ff', text: '#4338ca', dot: '#6366f1' },
  shipped: { bg: '#ecfdf5', text: '#047857', dot: '#10b981' },
  delivered: { bg: '#f0fdf4', text: '#15803d', dot: '#22c55e' },
  cancelled: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444' },
};

const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const ITEMS_PER_PAGE = 5;

const emptyForm = { items: '', total: '', status: 'pending', note: '' };

export default function MyOrders() {
  const { colors } = useTheme();
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  const [showDelete, setShowDelete] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filtered = useMemo(() =>
    orders.filter((o) => o.id.toLowerCase().includes(search.toLowerCase())),
    [orders, search]
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setFormError('');
  };

  const openEdit = (order) => {
    setEditingId(order.id);
    setForm({ items: String(order.items), total: String(order.total), status: order.status, note: order.note || '' });
    setFormError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    const itemCount = parseInt(form.items, 10);
    const totalVal = parseFloat(form.total);
    if (!itemCount || itemCount < 1) { setFormError('Items must be at least 1'); return; }
    if (!totalVal || totalVal <= 0) { setFormError('Total must be greater than 0'); return; }

    if (editingId) {
      setOrders((prev) => prev.map((o) =>
        o.id === editingId ? { ...o, items: itemCount, total: totalVal, status: form.status, note: form.note } : o
      ));
    } else {
      const maxNum = orders.reduce((max, o) => {
        const num = parseInt(o.id.replace('ORD-', ''), 10);
        return num > max ? num : max;
      }, 0);
      const newId = `ORD-${maxNum + 1}`;
      const today = new Date().toISOString().split('T')[0];
      setOrders((prev) => [{ id: newId, date: today, items: itemCount, total: totalVal, status: form.status, note: form.note }, ...prev]);
    }
    closeForm();
  };

  const openDeleteConfirm = (id) => {
    setDeletingId(id);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== deletingId));
    setShowDelete(false);
    setDeletingId(null);
    const newTotal = Math.ceil((orders.length - 1) / ITEMS_PER_PAGE);
    if (page > newTotal && newTotal > 0) setPage(newTotal);
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text,
    boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text }}>My Orders</h1>
        <Link to="/shop" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '10px 18px', borderRadius: '10px', border: 'none',
          background: colors.gradientPrimary, color: '#fff',
          fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(102,126,234,0.3)', transition: 'all 0.2s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Plus size={16} /> New Order
        </Link>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 16px', borderRadius: '12px',
        background: colors.bgCard, border: `1px solid ${colors.borderInput}`,
        marginBottom: '20px',
      }}>
        <Search size={16} color={colors.textSubtle} />
        <input
          type="text" placeholder="Search orders..." value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '14px', color: colors.text, width: '100%' }}
        />
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '650px' }}>
            <thead>
              <tr>
                {['Order ID', 'Date', 'Items', 'Total', 'Status', 'Action'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '14px 18px', fontSize: '12px',
                    fontWeight: '600', color: colors.textSubtle, textTransform: 'uppercase',
                    letterSpacing: '0.05em', borderBottom: `1px solid ${colors.border}`,
                    background: colors.bgBadge,
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((order) => {
                const badge = statusStyles[order.status];
                return (
                  <tr key={order.id} style={{ borderBottom: `1px solid ${colors.borderLight}` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgHover; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{ fontWeight: '600', color: colors.accent, fontSize: '14px' }}>{order.id}</span>
                    </td>
                    <td style={{ padding: '14px 18px', color: colors.textMuted, fontSize: '13px' }}>{formatDate(order.date)}</td>
                    <td style={{ padding: '14px 18px', fontSize: '13px', color: colors.textSecondary }}>{order.items} items</td>
                    <td style={{ padding: '14px 18px', fontWeight: '700', color: colors.text, fontSize: '14px' }}>{formatCurrency(order.total)}</td>
                    <td style={{ padding: '14px 18px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        padding: '4px 12px', borderRadius: '20px',
                        fontSize: '12px', fontWeight: '600',
                        background: badge.bg, color: badge.text, textTransform: 'capitalize',
                      }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badge.dot }} />
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
                        <Link to={`/user/orders/${order.id}`} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '6px 10px', borderRadius: '8px',
                          background: colors.bgHover, color: colors.textMuted,
                          textDecoration: 'none', fontSize: '12px', fontWeight: '500',
                          transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = colors.bgAccent; e.currentTarget.style.color = colors.accent; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textMuted; }}
                        >
                          <Eye size={14} />
                        </Link>
                        <button onClick={() => openEdit(order)} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '6px 10px', borderRadius: '8px',
                          background: colors.bgHover, color: colors.textMuted,
                          border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500',
                          transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.color = '#4338ca'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textMuted; }}
                          title="Edit order"
                        >
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => openDeleteConfirm(order.id)} style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '6px 10px', borderRadius: '8px',
                          background: colors.bgHover, color: colors.textMuted,
                          border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: '500',
                          transition: 'all 0.15s',
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = colors.bgHover; e.currentTarget.style.color = colors.textMuted; }}
                          title="Delete order"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '48px', textAlign: 'center' }}>
                    <Package size={36} color={colors.textSubtle} style={{ marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.text }}>No orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filtered.length > ITEMS_PER_PAGE && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderTop: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: '13px', color: colors.textMuted }}>
              Page {page} of {totalPages}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} style={{
                width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${colors.border}`,
                background: colors.bgCard, cursor: page === 1 ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === 1 ? 0.5 : 1,
              }}><ChevronLeft size={16} /></button>
              <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} style={{
                width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${colors.border}`,
                background: colors.bgCard, cursor: page === totalPages ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: page === totalPages ? 0.5 : 1,
              }}><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          padding: '16px',
        }} onClick={closeForm}>
          <div style={{
            background: colors.bgCard, borderRadius: '16px',
            border: `1px solid ${colors.border}`, padding: '28px',
            width: '100%', maxWidth: '440px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: colors.text }}>
                {editingId ? 'Edit Order' : 'New Order'}
              </h2>
              <button onClick={closeForm} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: colors.textMuted, padding: '4px', borderRadius: '6px',
                display: 'flex', alignItems: 'center',
              }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Items</label>
                  <input
                    type="number" min="1" required
                    placeholder="Number of items"
                    value={form.items}
                    onChange={(e) => handleFormChange('items', e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Total ($)</label>
                  <input
                    type="number" step="0.01" min="0.01" required
                    placeholder="0.00"
                    value={form.total}
                    onChange={(e) => handleFormChange('total', e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) => handleFormChange('status', e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer', textTransform: 'capitalize' }}
                >
                  {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Note (optional)</label>
                <textarea
                  rows={2} placeholder="Order note..."
                  value={form.note}
                  onChange={(e) => handleFormChange('note', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              {formError && (
                <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.danger, fontWeight: '500' }}>{formError}</p>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={closeForm} style={{
                  flex: 1, padding: '10px', borderRadius: '10px',
                  border: `1px solid ${colors.border}`, background: colors.bgCard,
                  color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                }}>Cancel</button>
                <button type="submit" style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                  background: colors.gradientPrimary, color: '#fff',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
                }}>{editingId ? 'Update Order' : 'Create Order'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          padding: '16px',
        }} onClick={() => setShowDelete(false)}>
          <div style={{
            background: colors.bgCard, borderRadius: '16px',
            border: `1px solid ${colors.border}`, padding: '28px',
            width: '100%', maxWidth: '400px', textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <AlertTriangle size={24} color="#dc2626" />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Delete Order?</h3>
            <p style={{ margin: '0 0 24px', fontSize: '14px', color: colors.textMuted }}>
              Are you sure you want to delete <strong>{deletingId}</strong>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowDelete(false)} style={{
                flex: 1, padding: '10px', borderRadius: '10px',
                border: `1px solid ${colors.border}`, background: colors.bgCard,
                color: colors.textSecondary, fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              }}>Cancel</button>
              <button onClick={confirmDelete} style={{
                flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                background: '#dc2626', color: '#fff',
                fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
