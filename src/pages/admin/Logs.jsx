import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import {
  Activity, Filter, Calendar, Download, RefreshCw,
  LogIn, ShoppingCart, Package, Server, ChevronDown,
  Clock, User, Search, X, ChevronRight, ArrowUpDown,
} from 'lucide-react';

const typeConfig = {
  Login: { color: '#3b82f6', bg: '#eff6ff', icon: LogIn },
  Order: { color: '#22c55e', bg: '#f0fdf4', icon: ShoppingCart },
  Product: { color: '#a855f7', bg: '#f5f3ff', icon: Package },
  System: { color: '#f59e0b', bg: '#fffbeb', icon: Server },
};

const actorConfig = {
  admin: { color: '#6366f1', bg: '#eef2ff' },
  user: { color: '#059669', bg: '#ecfdf5' },
  system: { color: '#f59e0b', bg: '#fffbeb' },
};

const logsData = [
  { id: 1, timestamp: '2026-08-16 14:32', type: 'Login', description: 'Charlie Davis logged in', user: 'Charlie Davis', actor: 'user' },
  { id: 2, timestamp: '2026-08-16 14:15', type: 'Order', description: 'New order ORD-7891 placed by John Doe', user: 'System', actor: 'system' },
  { id: 3, timestamp: '2026-08-16 13:45', type: 'Product', description: 'Product "Wireless Headphones" stock updated', user: 'Admin', actor: 'admin' },
  { id: 4, timestamp: '2026-08-16 12:30', type: 'System', description: 'Database backup completed', user: 'System', actor: 'system' },
  { id: 5, timestamp: '2026-08-16 11:00', type: 'Order', description: 'Order ORD-7890 marked as shipped', user: 'Admin', actor: 'admin' },
  { id: 6, timestamp: '2026-08-16 10:15', type: 'Login', description: 'Admin Charlie Davis logged in', user: 'Charlie Davis', actor: 'admin' },
  { id: 7, timestamp: '2026-08-16 09:30', type: 'Product', description: 'New category "Gaming" created', user: 'Admin', actor: 'admin' },
  { id: 8, timestamp: '2026-08-15 18:45', type: 'System', description: 'Server restart completed', user: 'System', actor: 'system' },
  { id: 9, timestamp: '2026-08-15 16:20', type: 'Order', description: 'Order ORD-7889 cancelled by customer', user: 'Customer', actor: 'user' },
  { id: 10, timestamp: '2026-08-15 14:00', type: 'Login', description: 'Diana Evans logged in', user: 'Diana Evans', actor: 'user' },
];

const filterTypes = ['All', 'Login', 'Order', 'Product', 'System'];

function LogEntry({ log, index, isLast, colors }) {
  const cfg = typeConfig[log.type];
  const TypeIcon = cfg.icon;
  const aCfg = actorConfig[log.actor] || actorConfig.system;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ display: 'flex', gap: '16px', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timeline line + dot */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '40px', flexShrink: 0, position: 'relative',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: cfg.bg, display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 1, flexShrink: 0,
          border: `2px solid ${colors.border}`,
          transition: 'all 0.25s',
          boxShadow: hovered ? `0 0 0 4px ${cfg.bg}` : 'none',
        }}>
          <TypeIcon size={18} color={cfg.color} strokeWidth={2} />
        </div>
        {!isLast && (
          <div style={{
            width: '2px', flex: 1, minHeight: '20px',
            background: `linear-gradient(180deg, ${cfg.color}40, ${colors.border})`,
            marginTop: '4px',
          }} />
        )}
      </div>

      {/* Card */}
      <div style={{
        flex: 1, marginBottom: isLast ? 0 : '16px',
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`,
        padding: '18px 20px',
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        boxShadow: hovered ? colors.shadowMd : 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: '600',
              background: cfg.bg, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              <TypeIcon size={12} />
              {log.type}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '4px 10px', borderRadius: '8px', fontSize: '11.5px', fontWeight: '600',
              background: aCfg.bg, color: aCfg.color, textTransform: 'capitalize',
            }}>
              {log.actor === 'admin' ? 'Admin' : log.actor === 'user' ? 'User' : 'System'}
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            fontSize: '12px', color: colors.textSubtle, fontWeight: '500',
          }}>
            <Clock size={13} />
            {log.timestamp}
          </div>
        </div>

        <p style={{
          margin: '12px 0 0', fontSize: '14px', fontWeight: '500',
          color: colors.text, lineHeight: '1.5',
        }}>
          {log.description}
        </p>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          marginTop: '10px', fontSize: '12.5px', color: colors.textMuted, fontWeight: '500',
        }}>
          <User size={13} />
          <span>{log.user}</span>
        </div>
      </div>
    </div>
  );
}

export default function Logs() {
  const { colors } = useTheme();
  const [filterType, setFilterType] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const filteredLogs = useMemo(() => {
    return logsData.filter((log) => {
      if (filterType !== 'All' && log.type !== filterType) return false;
      if (dateFrom && log.timestamp < dateFrom) return false;
      if (dateTo && log.timestamp > dateTo + ' 23:59') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          log.description.toLowerCase().includes(q) ||
          log.user.toLowerCase().includes(q) ||
          log.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filterType, dateFrom, dateTo, searchQuery]);

  const typeCounts = useMemo(() => {
    const counts = { All: logsData.length, Login: 0, Order: 0, Product: 0, System: 0 };
    logsData.forEach((log) => { counts[log.type]++; });
    return counts;
  }, []);

  const clearFilters = () => {
    setFilterType('All');
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
  };

  const hasActiveFilters = filterType !== 'All' || dateFrom || dateTo || searchQuery;

  return (
    <div>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4f46e5 60%, #7c3aed 100%)',
        borderRadius: '20px', padding: 'clamp(24px, 3vw, 36px)',
        position: 'relative', overflow: 'hidden', marginBottom: '24px',
      }}>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Activity size={18} color="#fbbf24" />
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Audit Trail</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              Logs
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: 'clamp(13px, 2vw, 15px)', color: 'rgba(255,255,255,0.7)', maxWidth: '480px', lineHeight: '1.5' }}>
              System activity audit trail
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)',
              color: '#fff', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer',
              backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            >
              <Download size={15} /> Export
            </button>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '10px 20px', borderRadius: '10px', background: '#fff',
              color: '#4f46e5', fontSize: '13px', fontWeight: '600', border: 'none', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <RefreshCw size={15} /> Refresh
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-50px', right: '100px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
      </div>

      {/* Filter Bar */}
      <div style={{
        background: colors.bgCard, borderRadius: '16px',
        border: `1px solid ${colors.border}`, padding: '20px 24px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
        }}>
          {/* Search */}
          <div style={{
            flex: '1 1 220px', position: 'relative',
          }}>
            <Search size={16} color={colors.textSubtle} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '10px 12px 10px 36px',
                borderRadius: '10px', border: `1px solid ${colors.border}`,
                background: colors.bgHover, color: colors.text,
                fontSize: '13px', outline: 'none', fontWeight: '500',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { e.target.style.borderColor = colors.accent; }}
              onBlur={(e) => { e.target.style.borderColor = colors.border; }}
            />
          </div>

          {/* Type Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 14px', borderRadius: '10px',
                border: `1px solid ${colors.border}`, background: colors.bgHover,
                color: colors.text, fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', minWidth: '130px', justifyContent: 'space-between',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={14} />
                {filterType}
              </span>
              <ChevronDown size={14} color={colors.textMuted} />
            </button>
            {showTypeDropdown && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 99 }}
                  onClick={() => setShowTypeDropdown(false)}
                />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 4px)', left: 0, minWidth: '180px',
                  background: colors.bgCard, borderRadius: '12px',
                  border: `1px solid ${colors.border}`,
                  boxShadow: colors.shadowLg || '0 20px 40px rgba(0,0,0,0.12)',
                  zIndex: 100, overflow: 'hidden', padding: '4px',
                }}>
                  {filterTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => { setFilterType(type); setShowTypeDropdown(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', padding: '10px 12px', border: 'none',
                        background: filterType === type ? colors.bgAccent : 'transparent',
                        color: filterType === type ? colors.accent : colors.text,
                        fontSize: '13px', fontWeight: filterType === type ? '600' : '500',
                        cursor: 'pointer', borderRadius: '8px', textAlign: 'left',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (filterType !== type) e.currentTarget.style.background = colors.bgHover; }}
                      onMouseLeave={(e) => { if (filterType !== type) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span>{type}</span>
                      <span style={{
                        fontSize: '11px', fontWeight: '600',
                        color: filterType === type ? colors.accent : colors.textMuted,
                        background: filterType === type ? (colors.bgHover || '#f3f4f6') : (colors.bgHover || '#f9fafb'),
                        padding: '2px 8px', borderRadius: '12px',
                      }}>
                        {typeCounts[type]}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Date From */}
          <div style={{ position: 'relative' }}>
            <Calendar size={14} color={colors.textSubtle} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder="From"
              style={{
                padding: '10px 12px 10px 32px', borderRadius: '10px',
                border: `1px solid ${colors.border}`, background: colors.bgHover,
                color: colors.text, fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', outline: 'none', width: '155px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { e.target.style.borderColor = colors.accent; }}
              onBlur={(e) => { e.target.style.borderColor = colors.border; }}
            />
          </div>

          {/* Date To */}
          <div style={{ position: 'relative' }}>
            <Calendar size={14} color={colors.textSubtle} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder="To"
              style={{
                padding: '10px 12px 10px 32px', borderRadius: '10px',
                border: `1px solid ${colors.border}`, background: colors.bgHover,
                color: colors.text, fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', outline: 'none', width: '155px',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => { e.target.style.borderColor = colors.accent; }}
              onBlur={(e) => { e.target.style.borderColor = colors.border; }}
            />
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '10px 14px', borderRadius: '10px', border: 'none',
                background: '#fef2f2', color: '#dc2626', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px', marginBottom: '24px',
      }}>
        {Object.entries(typeConfig).map(([type, cfg]) => {
          const Icon = cfg.icon;
          const count = logsData.filter((l) => l.type === type).length;
          return (
            <div
              key={type}
              onClick={() => setFilterType(filterType === type ? 'All' : type)}
              style={{
                background: filterType === type ? cfg.bg : colors.bgCard,
                borderRadius: '14px', padding: '16px',
                border: filterType === type ? `2px solid ${cfg.color}` : `1px solid ${colors.border}`,
                display: 'flex', alignItems: 'center', gap: '12px',
                cursor: 'pointer', transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 24px ${cfg.color}25`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px',
                background: cfg.color, display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: colors.textMuted, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{type}</p>
                <p style={{ margin: '2px 0 0', fontSize: '20px', fontWeight: '700', color: colors.text, lineHeight: '1.2' }}>{count}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{
        background: colors.bgCard, borderRadius: '20px',
        border: `1px solid ${colors.border}`, padding: '24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: colors.text, letterSpacing: '-0.01em' }}>
              Activity Timeline
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: colors.textSubtle }}>
              {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            fontSize: '12px', color: colors.textSubtle, fontWeight: '500',
          }}>
            <ArrowUpDown size={13} />
            Newest first
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '48px 24px',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: colors.bgHover, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 16px',
            }}>
              <Search size={24} color={colors.textMuted} />
            </div>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: colors.text }}>No logs found</p>
            <p style={{ margin: '6px 0 0', fontSize: '13px', color: colors.textMuted }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {filteredLogs.map((log, index) => (
              <LogEntry
                key={log.id}
                log={log}
                index={index}
                isLast={index === filteredLogs.length - 1}
                colors={colors}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
