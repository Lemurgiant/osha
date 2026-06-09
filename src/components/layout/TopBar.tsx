import { HardHat, Moon, Sun } from 'lucide-react'
import { useTheme, useThemeToggle } from '../../context/ThemeContext'

export function TopBar() {
  const C = useTheme()
  const { theme, toggleTheme } = useThemeToggle()

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 28px',
      borderBottom: `1px solid ${C.border}`,
      background: C.panel,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 38,
          height: 38,
          borderRadius: 10,
          background: C.accentBg,
          color: C.accent,
        }}>
          <HardHat size={20} />
        </div>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: -0.2 }}>SafeOps</div>
          <div style={{ fontSize: 12, color: C.textFaint }}>Workplace Safety &amp; OSHA Compliance</div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          borderRadius: 8,
          border: `1px solid ${C.border}`,
          background: C.panelAlt,
          color: C.text,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {theme === 'dark' ? <Sun size={16} color={C.accent} /> : <Moon size={16} color={C.accent} />}
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  )
}
