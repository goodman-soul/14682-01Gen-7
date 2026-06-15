import { create } from 'zustand'
import type { ThemeType, ThemeConfig } from '@/types'

interface ThemeState {
  currentTheme: ThemeType
  themes: ThemeConfig[]
  setTheme: (theme: ThemeType) => void
  getCurrentThemeConfig: () => ThemeConfig | undefined
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: 'orange',
  themes: [
    { name: '活力橙', type: 'orange', primary: '#FF6B35' },
    { name: '专业蓝', type: 'blue', primary: '#2563EB' },
    { name: '潮流黑', type: 'dark', primary: '#111827' }
  ],
  setTheme: (theme: ThemeType) => {
    console.log('[Theme] Switching theme to:', theme)
    set({ currentTheme: theme })
  },
  getCurrentThemeConfig: () => {
    const { currentTheme, themes } = get()
    return themes.find(t => t.type === currentTheme)
  }
}))
