import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Store } from 'lucide-react';

function SocialIcon({ path, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { label: 'All Products', path: '/shop' },
      { label: 'Cart', path: '/cart' },
      { label: 'Checkout', path: '/checkout' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'My Orders', path: '/user/orders' },
      { label: 'Wishlist', path: '/user/wishlist' },
      { label: 'Profile', path: '/user/profile' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', path: '/user/support' },
      { label: 'Reviews', path: '/user/reviews' },
      { label: 'Coupons', path: '/user/coupons' },
    ],
  },
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
    <footer className="mt-8 sm:mt-10" style={{ background: colors.bgSidebar }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* Brand */}
        <div className="mb-4 sm:mb-5">
          <Link to="/" className="inline-flex items-center gap-2 no-underline">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
            >
              <Store size={14} color="#fff" />
            </div>
            <span className="text-sm font-bold" style={{ color: colors.text }}>KH Shop</span>
          </Link>
          <p
            className="text-[11px] leading-relaxed mt-2 max-w-[320px]"
            style={{ color: colors.textMuted }}
          >
            Quality fashion at unbeatable prices with fast delivery.
          </p>
          <div className="flex gap-1.5 mt-2.5">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                title={social.label}
                onClick={(e) => e.preventDefault()}
                className="w-7 h-7 rounded-md flex items-center justify-center no-underline transition-all duration-200 hover:scale-110"
                style={{
                  background: colors.bgAccent,
                  color: colors.textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.bgAccent;
                  e.currentTarget.style.color = colors.textMuted;
                }}
              >
                <SocialIcon path={social.path} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns - always 3 columns */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4
                className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase m-0 mb-1.5 sm:mb-2.5"
                style={{ color: colors.textSecondary }}
              >
                {column.title}
              </h4>
              <ul className="list-none m-0 p-0 flex flex-col gap-1 sm:gap-1.5">
                {column.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[10px] sm:text-[11px] no-underline transition-colors duration-200"
                      style={{ color: colors.textMuted }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#667eea'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{ borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[10px] sm:text-[11px] m-0 text-center sm:text-left" style={{ color: colors.textSubtle }}>
              &copy; {new Date().getFullYear()} KH Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
              {payments.map((payment) => (
                <span
                  key={payment}
                  className="text-[10px] sm:text-[11px] font-medium rounded py-0.5 px-1.5 sm:px-2"
                  style={{
                    color: colors.textMuted,
                    background: colors.bgAccent,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {payment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
