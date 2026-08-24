import { Tags, Package, CheckCircle2, EyeOff } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function CategoryStats({ stats }) {
  const { colors } = useTheme();

  const cards = [
    {
      label: 'Total Categories',
      value: stats.total,
      description: 'All categories in your store',
      icon: Tags,
      gradient: '#000000',
      shadowColor: 'rgba(0,0,0,0.12)',
    },
    {
      label: 'Total Products',
      value: stats.products.toLocaleString(),
      description: 'Across every category',
      icon: Package,
      gradient: '#404040',
      shadowColor: 'rgba(0,0,0,0.3)',
    },
    {
      label: 'Active Categories',
      value: stats.active,
      description: 'Visible to customers',
      icon: CheckCircle2,
      gradient: '#262626',
      shadowColor: 'rgba(0,0,0,0.3)',
    },
    {
      label: 'Hidden Categories',
      value: stats.hidden,
      description: 'Not shown in storefront',
      icon: EyeOff,
      gradient: '#171717',
      shadowColor: 'rgba(0,0,0,0.3)',
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '20px',
    }}>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            style={{
              background: colors.bgCard,
              borderRadius: '16px',
              padding: '22px',
              border: `1px solid ${colors.border}`,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 20px 40px ${card.shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ margin: 0, fontSize: '12.5px', color: colors.textMuted, fontWeight: '500', marginBottom: '6px' }}>
                  {card.label}
                </p>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em', lineHeight: '1.2' }}>
                  {card.value}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: '12px', color: colors.textSubtle }}>
                  {card.description}
                </p>
              </div>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: card.gradient, display: 'flex', alignItems: 'center',
                justifyContent: 'center', boxShadow: `0 8px 20px ${card.shadowColor}`,
              }}>
                <Icon size={22} color="#fff" strokeWidth={2} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
