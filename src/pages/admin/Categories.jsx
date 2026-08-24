import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import Loading from '../../components/common/Loading';
import CategoryStats from '../../components/categories/CategoryStats';
import CategoryFilters from '../../components/categories/CategoryFilters';
import CategoryTable from '../../components/categories/CategoryTable';
import CategoryModal from '../../components/categories/CategoryModal';
import DeleteCategoryModal from '../../components/categories/DeleteCategoryModal';
import CategoryPagination from '../../components/categories/CategoryPagination';
import {
  PAGE_SIZE,
  initialCategories,
  getCategoryStats,
  filterCategories,
  sortCategories,
} from '../../data/categoryData';

export default function Categories() {
  const { colors } = useTheme();
  const [categories, setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [parentFilter, setParentFilter] = useState('');
  const [sortValue, setSortValue] = useState('name-asc');
  const [page, setPage] = useState(1);
  const [formModal, setFormModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleParentChange = (value) => {
    setParentFilter(value);
    setPage(1);
  };

  const handleSortChange = (value) => {
    setSortValue(value);
    setPage(1);
  };

  const filteredCategories = useMemo(
    () => sortCategories(filterCategories(categories, { search, statusFilter, parentFilter }), sortValue),
    [categories, search, statusFilter, parentFilter, sortValue]
  );

  const stats = useMemo(() => getCategoryStats(categories), [categories]);

  const parentOptions = useMemo(
    () => categories.map((c) => ({ value: String(c.id), label: c.name })),
    [categories]
  );

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedCategories = filteredCategories.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasActiveFilters = search.trim() !== '' || statusFilter !== 'all' || parentFilter !== '';

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setParentFilter('');
  };

  const openCreate = () => setFormModal({ mode: 'create', category: null });
  const openEdit = (category) => setFormModal({ mode: 'edit', category });
  const openView = (category) => setFormModal({ mode: 'view', category });

  const handleSubmit = (formData) => {
    if (!formModal) return;
    if (formModal.mode === 'create') {
      setCategories((prev) => [
        {
          id: Date.now(),
          emoji: '🏷️',
          bg: '#eef2ff',
          color: '#6366f1',
          products: 0,
          createdAt: new Date().toISOString().slice(0, 10),
          ...formData,
        },
        ...prev,
      ]);
    } else if (formModal.mode === 'edit') {
      setCategories((prev) =>
        prev.map((c) => (c.id === formModal.category.id ? { ...c, ...formData } : c))
      );
    }
    setFormModal(null);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
  };

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '24px', flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: colors.text, letterSpacing: '-0.02em' }}>
            Category Management
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: colors.textMuted }}>
            Organize and manage your product categories
          </p>
        </div>
        <button
          onClick={openCreate}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 20px',
            background: colors.gradientPrimary, color: '#fff', border: 'none',
            borderRadius: '10px', fontSize: '13.5px', fontWeight: '600',
            cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 14px rgba(102,126,234,0.3)',
          }}
        >
          <Plus size={16} />
          Add New Category
        </button>
      </div>

      <CategoryStats stats={stats} />

      {!isLoading && (
        <CategoryFilters
          search={search}
          onSearchChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusChange={handleStatusChange}
          parentFilter={parentFilter}
          onParentChange={handleParentChange}
          parentOptions={parentOptions}
          sortValue={sortValue}
          onSortChange={handleSortChange}
        />
      )}

      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, overflow: 'hidden',
      }}>
        {isLoading ? (
          <Loading text="Loading categories..." />
        ) : (
          <>
            <div style={{ padding: '16px' }}>
              <CategoryTable
                categories={pagedCategories}
                categoriesAll={categories}
                isMobile={isMobile}
                hasActiveFilters={hasActiveFilters}
                onView={openView}
                onEdit={openEdit}
                onDelete={setDeleteTarget}
                onClearFilters={clearFilters}
              />
            </div>
            <CategoryPagination
              page={currentPage}
              totalPages={totalPages}
              totalItems={filteredCategories.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {formModal && (
        <CategoryModal
          isOpen={true}
          readOnly={formModal.mode === 'view'}
          editing={formModal.mode === 'create' ? null : formModal.category}
          categories={categories}
          onClose={() => setFormModal(null)}
          onSubmit={handleSubmit}
        />
      )}

      <DeleteCategoryModal
        isOpen={Boolean(deleteTarget)}
        category={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
