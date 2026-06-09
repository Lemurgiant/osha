import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ColorTokens, Theme } from '../types'
import { DARK_C, LIGHT_C } from '../data/theme'

interface ThemeContextValue {
  tokens: ColorTokens
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark')

  const value = useMemo<ThemeContextValue>(() => ({
    tokens: theme === 'dark' ? DARK_C : LIGHT_C,
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

export function useTheme(): ColorTokens {
  return useThemeContext().tokens
}

export function useThemeToggle(): { theme: Theme; toggleTheme: () => void } {
  const { theme, toggleTheme } = useThemeContext()
  return { theme, toggleTheme }
}
