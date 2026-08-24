import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Store, CreditCard, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

function BrandIcon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Home', path: '/' },
      { label: 'All Products', path: '/shop' },
      { label: 'Cart', path: '/cart' },
      { label: 'Checkout', path: '/checkout' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', path: '/auth/login' },
      { label: 'Register', path: '/auth/register' },
      { label: 'My Orders', path: '/user/orders' },
      { label: 'Wishlist', path: '/user/wishlist' },
      { label: 'Profile', path: '/user/profile' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/user/support' },
      { label: 'Coupons', path: '/user/coupons' },
      { label: 'Reviews', path: '/user/reviews' },
      { label: 'Notifications', path: '/user/notifications' },
    ],
  },
];

const perks = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '30-day return policy' },
  { icon: ShieldCheck, label: 'Secure Payment', sub: '100% protected' },
  { icon: CreditCard, label: 'Flexible Pay', sub: 'Cards & wallets' },
];

const socials = [
  {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z',
  },
  {
    label: 'X',
    path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
  },
  {
    label: 'YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const payments = ['Visa', 'Mastercard', 'PayPal', 'KHQR'];

export default function Footer() {
  const { colors } = useTheme();

  return (
    <footer style={{
      background: colors.bgSidebar,
      borderTop: `1px solid ${colors.border}`,
      marginTop: '48px',
    }}>
      <div style={{
        background: colors.bgCard,
        borderBottom: `1px solid ${colors.border}`,
        padding: '20px clamp(16px, 3vw, 32px)',
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
        }}>
          {perks.map((perk) => (
            <div key={perk.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: colors.bgAccent, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <perk.icon size={18} color={colors.accent} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: colors.text }}>{perk.label}</p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>{perk.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '40px clamp(16px, 3vw, 32px) 32px' }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1.4fr) repeat(3, 1fr)',
          gap: 'clamp(24px, 4vw, 48px)',
        }} className="footer-grid-responsive">
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: colors.gradientPrimary, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Store size={18} color="#fff" />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '700', color: colors.text }}>Kh-Shop</span>
            </Link>
            <p style={{
              margin: '14px 0 0', fontSize: '13px', lineHeight: 1.6,
              color: colors.textMuted, maxWidth: '280px',
            }}>
              Your one-stop shop for everything. Quality products, great prices and fast delivery across Cambodia.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  title={social.label}
                  onClick={(e) => e.preventDefault()}
                  style={{
                    width: '34px', height: '34px', borderRadius: '8px',
                    border: `1px solid ${colors.border}`,
                    color: colors.textMuted, textDecoration: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.bgAccent;
                    e.currentTarget.style.color = colors.accent;
                    e.currentTarget.style.borderColor = colors.accentLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = colors.textMuted;
                    e.currentTarget.style.borderColor = colors.border;
                  }}
                >
                  <BrandIcon path={social.path} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 style={{
                margin: '4px 0 14px', fontSize: '13px', fontWeight: '700',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: colors.textSecondary,
              }}>
                {column.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} style={{
                      fontSize: '13px', color: colors.textMuted,
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = colors.accent; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${colors.border}`, padding: '18px clamp(16px, 3vw, 32px)' }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ margin: 0, fontSize: '12px', color: colors.textSubtle }}>
            &copy; {new Date().getFullYear()} Kh-Shop. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {payments.map((payment) => (
              <span key={payment} style={{
                fontSize: '11px', fontWeight: '600', color: colors.textMuted,
                background: colors.bgBadge, border: `1px solid ${colors.border}`,
                borderRadius: '6px', padding: '4px 10px',
              }}>
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
