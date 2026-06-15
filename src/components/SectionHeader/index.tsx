import React from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss'

interface SectionHeaderProps {
  title: string
  moreText?: string
  onMoreClick?: () => void
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, moreText, onMoreClick }) => {
  return (
    <View className={styles.sectionHeader}>
      <Text className={styles.title}>{title}</Text>
      {moreText && (
        <Text className={styles.more} onClick={onMoreClick}>
          {moreText}
        </Text>
      )}
    </View>
  )
}

export default SectionHeader
