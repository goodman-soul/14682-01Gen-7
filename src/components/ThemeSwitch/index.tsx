import React from 'react'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import { useTheme } from '@/hooks/useTheme'
import type { ThemeType } from '@/types'
import styles from './index.module.scss'

const ThemeSwitch: React.FC = () => {
  const { currentTheme, themes, setTheme } = useTheme()

  return (
    <View className={styles.themeSwitch}>
      <Text className={styles.title}>品牌主题</Text>
      <View className={styles.themeList}>
        {themes.map((theme) => (
          <View
            key={theme.type}
            className={classNames(
              styles.themeItem,
              currentTheme === theme.type && styles.active
            )}
            onClick={() => setTheme(theme.type as ThemeType)}
          >
            <View
              className={styles.colorDot}
              style={{ backgroundColor: theme.primary }}
            />
            <Text className={styles.themeName}>{theme.name}</Text>
            {currentTheme === theme.type && (
              <View className={styles.checkMark}>✓</View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default ThemeSwitch
