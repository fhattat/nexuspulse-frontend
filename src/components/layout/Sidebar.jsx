import { BarChart3, Upload, MessageSquare, Settings, Activity, Zap, PlusCircle } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'upload',    label: 'Upload',    icon: Upload },
  { id: 'chat',      label: 'AI Chat',   icon: MessageSquare },
];

export default function Sidebar({ activeView, onNavigate, session, onNewChat }) {
  return (
    <aside style={{
      width: '256px', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 20,
      backgroundColor: '#0f1629', borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            backgroundColor: '#e94560', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>NexusPulse</div>
            <div style={{ fontSize: '10px', color: '#60a5fa', fontFamily: 'monospace', letterSpacing: '0.1em' }}>AI ANALYTICS</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeView === id;
          const isDisabled = (id === 'chat' || id === 'dashboard') && !session;
          return (
            <button key={id} onClick={() => !isDisabled && onNavigate(id)} disabled={isDisabled}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer',
                fontSize: '14px', fontWeight: 500, textAlign: 'left', transition: 'all 0.15s',
                backgroundColor: isActive ? 'rgba(15,52,96,0.5)' : 'transparent',
                color: isActive ? '#93c5fd' : isDisabled ? '#374151' : 'rgba(226,232,240,0.6)',
                outline: isActive ? '1px solid rgba(37,99,235,0.2)' : 'none',
              }}>
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
              {label}
              {isDisabled && (
                <span style={{ marginLeft: 'auto', fontSize: '10px', fontFamily: 'monospace', color: '#374151' }}>LOCKED</span>
              )}
            </button>
          );
        })}

        {/* New Chat button */}
        {session && (
          <button onClick={onNewChat}
            style={{
              marginTop: '12px', width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              padding: '14px 16px', borderRadius: '10px', border: 'none',
              cursor: 'pointer', fontSize: '14px', fontWeight: 600, textAlign: 'left', transition: 'all 0.2s',
              backgroundColor: 'rgba(233,69,96,0.15)', color: '#f06580',
              boxShadow: 'inset 0 0 0 1px rgba(233,69,96,0.25)',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(233,69,96,0.25)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(233,69,96,0.15)'; e.currentTarget.style.color = '#f06580'; }}>
            <PlusCircle size={18} strokeWidth={2} />
            New Chat
          </button>
        )}
      </nav>

      {/* Session info */}
      {session && (
        <div style={{
          margin: '0 12px 12px', padding: '12px', borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Activity size={14} color="#00b894" />
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#55efc4' }}>Active Session</span>
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(226,232,240,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.filename}</div>
          <div style={{ fontSize: '11px', color: 'rgba(226,232,240,0.3)', fontFamily: 'monospace', marginTop: '2px' }}>
            {session.row_count} rows · {session.columns?.length} cols
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(226,232,240,0.2)', fontSize: '12px' }}>
          <Settings size={14} />
          <span>v1.0.0 · Phase 6</span>
        </div>
      </div>
    </aside>
  );
}
