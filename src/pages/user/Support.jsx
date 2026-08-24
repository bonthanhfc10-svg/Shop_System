import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { MessageSquare, Send, Phone, Mail } from 'lucide-react';

const faqItems = [
  { q: 'How do I track my order?', a: 'Go to My Orders and click on the order ID to see tracking details.' },
  { q: 'What is the return policy?', a: 'You can return items within 30 days of delivery for a full refund.' },
  { q: 'How do I apply a coupon?', a: 'Enter your coupon code at checkout in the coupon field.' },
  { q: 'Can I change my shipping address?', a: 'Yes, you can update your address in the Addresses section before your order ships.' },
];

export default function Support() {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`, fontSize: '14px',
    outline: 'none', background: colors.bgInput, color: colors.text, boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 24px)' }}>
      <h1 style={{ margin: '0 0 24px', fontSize: '24px', fontWeight: '700', color: colors.text }}>Help & Support</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {[
          { icon: MessageSquare, label: 'Live Chat', desc: 'Chat with us', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
          { icon: Phone, label: 'Call Us', desc: '+855 12 345 6789', gradient: 'linear-gradient(135deg, #10b981 0%, #38ef7d 100%)' },
          { icon: Mail, label: 'Email', desc: 'support@khshop.com', gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} style={{
              padding: '20px', background: colors.bgCard, borderRadius: '14px',
              border: `1px solid ${colors.border}`, textAlign: 'center',
              cursor: 'pointer', transition: 'all 0.25s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = colors.shadowMd; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: item.gradient, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 10px',
              }}>
                <Icon size={22} color="#fff" />
              </div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>{item.label}</p>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: colors.textMuted }}>{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '24px', marginBottom: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Send us a Message</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Subject</label>
            <input placeholder="How can we help?" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: '600', color: colors.textMuted }}>Message</label>
            <textarea
              rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue..."
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <button style={{
            alignSelf: 'flex-end', padding: '10px 20px', borderRadius: '10px',
            border: 'none', background: colors.gradientPrimary, color: '#fff',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <Send size={14} /> Send Message
          </button>
        </div>
      </div>

      <div style={{
        background: colors.bgCard, borderRadius: '16px', border: `1px solid ${colors.border}`,
        padding: '24px',
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: '17px', fontWeight: '700', color: colors.text }}>Frequently Asked Questions</h3>
        {faqItems.map((faq, i) => (
          <div key={i} style={{
            borderBottom: i < faqItems.length - 1 ? `1px solid ${colors.borderLight}` : 'none',
          }}>
            <button
              onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              style={{
                width: '100%', padding: '14px 0', border: 'none', background: 'none',
                textAlign: 'left', cursor: 'pointer', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{faq.q}</span>
              <span style={{ fontSize: '18px', color: colors.textMuted, transition: 'transform 0.2s', transform: expandedFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
            </button>
            {expandedFaq === i && (
              <p style={{ margin: '0 0 14px', fontSize: '13px', color: colors.textSecondary, lineHeight: '1.6', animation: 'fadeIn 0.2s ease' }}>
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
