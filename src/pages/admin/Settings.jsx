import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import {
  Store, DollarSign, Bell, Shield, Save, MapPin, Globe,
  Mail, Phone, Building, ChevronDown, Check, AlertTriangle,
  Lock, Clock, KeyRound, ShieldCheck,
} from 'lucide-react';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '\u20AC', name: 'Euro' },
  { code: 'GBP', symbol: '\u00A3', name: 'British Pound' },
  { code: 'KHR', symbol: '\u17DB', name: 'Cambodian Riel' },
  { code: 'JPY', symbol: '\u00A5', name: 'Japanese Yen' },
];

const timeoutOptions = [
  { value: '15', label: '15 minutes' },
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '120', label: '2 hours' },
  { value: '480', label: '8 hours' },
];

const passwordPolicies = [
  { value: 'low', label: 'Low', desc: '6+ characters' },
  { value: 'medium', label: 'Medium', desc: '8+ chars, numbers' },
  { value: 'high', label: 'High', desc: '12+ chars, mixed case, symbols' },
];

function ToggleSwitch({ enabled, onToggle, disabled = false }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      style={{
        width: '48px',
        height: '26px',
        borderRadius: '13px',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: enabled ? colors.accent : colors.borderInput,
        position: 'relative',
        transition: 'background 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: disabled ? 0.5 : 1,
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: '#fff',
        position: 'absolute',
        top: '3px',
        left: enabled ? '25px' : '3px',
        transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function SectionCard({ icon: Icon, iconBg, title, subtitle, children }) {
  const { colors } = useTheme();

  return (
    <div style={{
      background: colors.bgCard,
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = colors.shadowMd; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        padding: '22px 24px',
        borderBottom: `1px solid ${colors.borderLight}`,
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={21} color="#fff" strokeWidth={2} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>
            {title}
          </h3>
          <p style={{ margin: '2px 0 0', fontSize: '13px', color: colors.textSubtle }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ padding: '22px 24px' }}>
        {children}
      </div>
    </div>
  );
}

function FieldRow({ label, children, description }) {
  const { colors } = useTheme();
  return (
    <div style={{ marginBottom: '18px' }}>
      <label style={{
        display: 'block',
        fontSize: '13px',
        fontWeight: '600',
        color: colors.textSecondary,
        marginBottom: '6px',
      }}>
        {label}
      </label>
      {children}
      {description && (
        <p style={{ margin: '5px 0 0', fontSize: '12px', color: colors.textSubtle }}>
          {description}
        </p>
      )}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, icon: Icon, type = 'text', disabled = false }) {
  const { colors } = useTheme();
  return (
    <div style={{ position: 'relative' }}>
      {Icon && (
        <div style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', alignItems: 'center', pointerEvents: 'none',
        }}>
          <Icon size={16} color={colors.textSubtle} />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: Icon ? '10px 14px 10px 38px' : '10px 14px',
          borderRadius: '10px',
          border: `1px solid ${colors.borderInput}`,
          background: colors.bgInput,
          color: colors.text,
          fontSize: '13.5px',
          fontWeight: '400',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxSizing: 'border-box',
          opacity: disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = colors.accent;
          e.target.style.boxShadow = `0 0 0 3px ${colors.accent}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = colors.borderInput;
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}

function SelectInput({ value, onChange, options, icon: Icon }) {
  const { colors } = useTheme();
  return (
    <div style={{ position: 'relative' }}>
      {Icon && (
        <div style={{
          position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 1,
        }}>
          <Icon size={16} color={colors.textSubtle} />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: Icon ? '10px 38px 10px 38px' : '10px 38px 10px 14px',
          borderRadius: '10px',
          border: `1px solid ${colors.borderInput}`,
          background: colors.bgInput,
          color: colors.text,
          fontSize: '13.5px',
          fontWeight: '400',
          outline: 'none',
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = colors.accent;
          e.target.style.boxShadow = `0 0 0 3px ${colors.accent}22`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = colors.borderInput;
          e.target.style.boxShadow = 'none';
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div style={{
        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', pointerEvents: 'none',
      }}>
        <ChevronDown size={16} color={colors.textSubtle} />
      </div>
    </div>
  );
}

function SaveButton({ onClick, saving }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      disabled={saving}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 22px',
        borderRadius: '10px',
        border: 'none',
        background: colors.accent,
        color: '#fff',
        fontSize: '13.5px',
        fontWeight: '600',
        cursor: saving ? 'not-allowed' : 'pointer',
        opacity: saving ? 0.7 : 1,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!saving) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 4px 12px ${colors.accent}44`; }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Save size={15} />
      {saving ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

export default function Settings() {
  const { colors } = useTheme();
  const [saving, setSaving] = useState(null);

  const [storeInfo, setStoreInfo] = useState({
    storeName: 'Kh-Shop',
    email: 'admin@khshop.com',
    phone: '+1 555 123 4567',
    street: '123 Commerce Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
  });

  const [currencyTax, setCurrencyTax] = useState({
    currency: 'USD',
    taxRate: '8.5',
    shippingCost: '5.99',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
    passwordPolicy: 'medium',
  });

  const handleSave = (section) => {
    setSaving(section);
    setTimeout(() => setSaving(null), 1200);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: `1px solid ${colors.borderInput}`,
    background: colors.bgInput,
    color: colors.text,
    fontSize: '13.5px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: '#000000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShieldCheck size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: colors.text, letterSpacing: '-0.02em' }}>
              Settings
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: colors.textSubtle }}>Configure your store</p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
        gap: '20px',
      }}>

        <SectionCard
          icon={Store}
          iconBg="#000000"
          title="Store Information"
          subtitle="Basic store details and contact"
        >
          <FieldRow label="Store Name">
            <TextInput
              value={storeInfo.storeName}
              onChange={(e) => setStoreInfo({ ...storeInfo, storeName: e.target.value })}
              placeholder="Enter store name"
              icon={Building}
            />
          </FieldRow>
          <FieldRow label="Email Address">
            <TextInput
              value={storeInfo.email}
              onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
              placeholder="admin@example.com"
              icon={Mail}
              type="email"
            />
          </FieldRow>
          <FieldRow label="Phone Number">
            <TextInput
              value={storeInfo.phone}
              onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              placeholder="+1 555 000 0000"
              icon={Phone}
            />
          </FieldRow>
          <FieldRow label="Street Address">
            <TextInput
              value={storeInfo.street}
              onChange={(e) => setStoreInfo({ ...storeInfo, street: e.target.value })}
              placeholder="123 Main St"
              icon={MapPin}
            />
          </FieldRow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FieldRow label="City">
              <TextInput
                value={storeInfo.city}
                onChange={(e) => setStoreInfo({ ...storeInfo, city: e.target.value })}
                placeholder="New York"
              />
            </FieldRow>
            <FieldRow label="State / Province">
              <TextInput
                value={storeInfo.state}
                onChange={(e) => setStoreInfo({ ...storeInfo, state: e.target.value })}
                placeholder="NY"
              />
            </FieldRow>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FieldRow label="ZIP / Postal Code">
              <TextInput
                value={storeInfo.zipCode}
                onChange={(e) => setStoreInfo({ ...storeInfo, zipCode: e.target.value })}
                placeholder="10001"
              />
            </FieldRow>
            <FieldRow label="Country">
              <TextInput
                value={storeInfo.country}
                onChange={(e) => setStoreInfo({ ...storeInfo, country: e.target.value })}
                placeholder="United States"
                icon={Globe}
              />
            </FieldRow>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <SaveButton onClick={() => handleSave('store')} saving={saving === 'store'} />
          </div>
        </SectionCard>

        <SectionCard
          icon={DollarSign}
          iconBg="#262626"
          title="Currency & Tax"
          subtitle="Financial configuration"
        >
          <FieldRow label="Currency">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 1,
              }}>
                <Globe size={16} color={colors.textSubtle} />
              </div>
              <select
                value={currencyTax.currency}
                onChange={(e) => setCurrencyTax({ ...currencyTax, currency: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 38px 10px 38px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.borderInput}`,
                  background: colors.bgInput,
                  color: colors.text,
                  fontSize: '13.5px',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.accent}22`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderInput;
                  e.target.style.boxShadow = 'none';
                }}
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code} - {c.name}
                  </option>
                ))}
              </select>
              <div style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', pointerEvents: 'none',
              }}>
                <ChevronDown size={16} color={colors.textSubtle} />
              </div>
            </div>
          </FieldRow>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <FieldRow label="Tax Rate (%)" description="Applied to all orders">
              <TextInput
                value={currencyTax.taxRate}
                onChange={(e) => setCurrencyTax({ ...currencyTax, taxRate: e.target.value })}
                placeholder="8.5"
                type="number"
              />
            </FieldRow>
            <FieldRow label="Shipping Cost" description="Default shipping fee">
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 1,
                }}>
                  <DollarSign size={16} color={colors.textSubtle} />
                </div>
                <input
                  type="number"
                  value={currencyTax.shippingCost}
                  onChange={(e) => setCurrencyTax({ ...currencyTax, shippingCost: e.target.value })}
                  placeholder="5.99"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    borderRadius: '10px',
                    border: `1px solid ${colors.borderInput}`,
                    background: colors.bgInput,
                    color: colors.text,
                    fontSize: '13.5px',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.accent;
                    e.target.style.boxShadow = `0 0 0 3px ${colors.accent}22`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.borderInput;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </FieldRow>
          </div>

          <div style={{
            padding: '14px 16px', borderRadius: '10px', marginTop: '8px',
            background: colors.bgAccent, border: `1px solid ${colors.border}`,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <AlertTriangle size={16} color={colors.warning} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '12.5px', color: colors.textSecondary, lineHeight: '1.5' }}>
              Changes to currency and tax settings will apply to all new orders. Existing orders are not affected.
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
            <SaveButton onClick={() => handleSave('currency')} saving={saving === 'currency'} />
          </div>
        </SectionCard>

        <SectionCard
          icon={Bell}
          iconBg="#404040"
          title="Notification Settings"
          subtitle="Manage alert preferences"
        >
          {[
            {
              key: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive email alerts for important system events',
              icon: Mail,
            },
            {
              key: 'orderUpdates',
              label: 'Order Updates',
              description: 'Get notified when orders are placed, shipped, or delivered',
              icon: Bell,
            },
            {
              key: 'marketingEmails',
              label: 'Marketing Emails',
              description: 'Receive promotional content and product recommendations',
              icon: Globe,
            },
          ].map((item, index) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.key} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                padding: '16px',
                borderRadius: '12px',
                background: notifications[item.key] ? colors.bgAccent : colors.bgHover,
                border: `1px solid ${notifications[item.key] ? colors.border : 'transparent'}`,
                marginBottom: index < 2 ? '10px' : 0,
                transition: 'all 0.25s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px',
                    background: notifications[item.key]
                      ? `${colors.accent}18`
                      : colors.bgInput,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <ItemIcon size={17} color={notifications[item.key] ? colors.accent : colors.textSubtle} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                      {item.label}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle, lineHeight: '1.4' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={notifications[item.key]}
                  onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                />
              </div>
            );
          })}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
            <SaveButton onClick={() => handleSave('notifications')} saving={saving === 'notifications'} />
          </div>
        </SectionCard>

        <SectionCard
          icon={Shield}
          iconBg="#404040"
          title="Security"
          subtitle="Protect your account"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '16px',
            borderRadius: '12px',
            background: security.twoFactor ? colors.bgAccent : colors.bgHover,
            border: `1px solid ${security.twoFactor ? colors.border : 'transparent'}`,
            marginBottom: '14px',
            transition: 'all 0.25s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: security.twoFactor ? `${colors.accent}18` : colors.bgInput,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <KeyRound size={17} color={security.twoFactor ? colors.accent : colors.textSubtle} />
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: colors.text }}>
                  Two-Factor Authentication
                </p>
                <p style={{ margin: '2px 0 0', fontSize: '12px', color: colors.textSubtle }}>
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            <ToggleSwitch
              enabled={security.twoFactor}
              onToggle={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
            />
          </div>

          <FieldRow label="Session Timeout" description="Auto-logout after inactivity">
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 1,
              }}>
                <Clock size={16} color={colors.textSubtle} />
              </div>
              <select
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 38px 10px 38px',
                  borderRadius: '10px',
                  border: `1px solid ${colors.borderInput}`,
                  background: colors.bgInput,
                  color: colors.text,
                  fontSize: '13.5px',
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.accent}22`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderInput;
                  e.target.style.boxShadow = 'none';
                }}
              >
                {timeoutOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <div style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                display: 'flex', alignItems: 'center', pointerEvents: 'none',
              }}>
                <ChevronDown size={16} color={colors.textSubtle} />
              </div>
            </div>
          </FieldRow>

          <FieldRow label="Password Policy" description="Minimum password strength for all users">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {passwordPolicies.map((policy) => (
                <button
                  key={policy.value}
                  onClick={() => setSecurity({ ...security, passwordPolicy: policy.value })}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '10px',
                    border: `2px solid ${security.passwordPolicy === policy.value ? colors.accent : colors.borderInput}`,
                    background: security.passwordPolicy === policy.value ? colors.bgAccent : colors.bgInput,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (security.passwordPolicy !== policy.value) {
                      e.currentTarget.style.borderColor = colors.accentLight;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (security.passwordPolicy !== policy.value) {
                      e.currentTarget.style.borderColor = colors.borderInput;
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                    {security.passwordPolicy === policy.value && (
                      <Check size={13} color={colors.accent} strokeWidth={3} />
                    )}
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: security.passwordPolicy === policy.value ? colors.accent : colors.textSecondary,
                    }}>
                      {policy.label}
                    </span>
                  </div>
                  <p style={{
                    margin: 0, fontSize: '11px',
                    color: colors.textSubtle, lineHeight: '1.3',
                  }}>
                    {policy.desc}
                  </p>
                </button>
              ))}
            </div>
          </FieldRow>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <SaveButton onClick={() => handleSave('security')} saving={saving === 'security'} />
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
