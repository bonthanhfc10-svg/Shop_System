import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Plus, Package, TrendingUp, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const brands = [
  { id: 1, name: 'Apple', products: 45, revenue: 28450, color: '#a3a3a3' },
  { id: 2, name: 'Samsung', products: 38, revenue: 22320, color: '#171717' },
  { id: 3, name: 'Sony', products: 32, revenue: 18680, color: '#000000' },
  { id: 4, name: 'Nike', products: 28, revenue: 15240, color: '#525252' },
  { id: 5, name: 'Adidas', products: 24, revenue: 12870, color: '#1a1a1a' },
  { id: 6, name: 'Logitech', products: 20, revenue: 9650, color: '#737373' },
];

export default function Brands() {
  const { colors } = useTheme();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: colors.text, margin: 0 }}>Brands</h1>
          <p style={{ fontSize: '13px', color: colors.textSubtle, margin: '4px 0 0' }}>Manage product brands</p>
        </div>
        <Link to="/admin/brands/add" style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
          background: '#000000',
          color: '#fff', borderRadius: '10px', fontSize: '13px', fontWeight: '600', textDecoration: 'none',
        }}>
          <Plus size={16} /> Add Brand
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {brands.map((brand) => (
          <div key={brand.id} style={{
            background: colors.bgCard, borderRadius: '16px', padding: '24px',
            border: `1px solid ${colors.border}`, transition: 'all 0.25s', cursor: 'pointer',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: brand.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0,
              }}>
                {brand.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '17px', fontWeight: '600', color: colors.text, margin: '0 0 4px' }}>{brand.name}</h3>
                <span style={{
                  fontSize: '12px', fontWeight: '600', padding: '3px 10px', borderRadius: '12px',
                  background: `${colors.accent}15`, color: colors.accent,
                }}>
                  {brand.products} products
                </span>
              </div>
              <ChevronRight size={18} color={colors.textSubtle} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: `1px solid ${colors.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${colors.accent}12`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Package size={15} color={colors.accent} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', color: colors.textSubtle }}>Products</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{brand.products}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={15} color="#171717" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '11px', color: colors.textSubtle }}>Revenue</p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{formatCurrency(brand.revenue)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
