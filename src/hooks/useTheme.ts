import { useThemeStore } from '@/store/useThemeStore'
import type { ThemeType } from '@/types'

export function useTheme() {
  const { currentTheme, themes, setTheme, getCurrentThemeConfig } = useThemeStore()

  const themeClass = `theme-${currentTheme}`

  const getNavigationBarColor = () => {
    const config = getCurrentThemeConfig()
    return config?.primary || '#FF6B35'
  }

  return {
    currentTheme,
    themes,
    themeClass,
    setTheme: (theme: ThemeType) => {
      setTheme(theme)
    },
    getCurrentThemeConfig,
    getNavigationBarColor
  }
}
