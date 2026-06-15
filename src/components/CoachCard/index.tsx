import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import type { Coach } from '@/types'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import styles from './index.module.scss'

interface CoachCardProps {
  coach: Coach
  onClick?: () => void
}

const CoachCard: React.FC<CoachCardProps> = ({ coach, onClick }) => {
  const { isCrossStore } = useCurrentStore()
  const crossStore = isCrossStore(coach.storeId)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      Taro.navigateTo({
        url: `/pages/coach-detail/index?id=${coach.id}`
      })
    }
  }

  return (
    <View className={styles.coachCard} onClick={handleClick}>
      <View className={styles.avatarContainer}>
        <Image
          className={styles.avatar}
          src={coach.avatar}
          mode='aspectFill'
          onError={(e) => console.error('[CoachCard] Image load error:', e)}
        />
        {crossStore && (
          <View className={styles.crossBadge}>跨</View>
        )}
      </View>
      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.name}>{coach.name}</Text>
          <View className={styles.rating}>
            <Text className={styles.ratingValue}>{coach.rating}</Text>
            <Text className={styles.ratingText}>分</Text>
          </View>
        </View>
        <View className={styles.specialty}>
          {coach.specialty.slice(0, 3).map((item, index) => (
            <Text key={index} className={styles.specialtyTag}>
              {item}
            </Text>
          ))}
        </View>
        <View className={styles.footer}>
          <Text className={styles.experience}>
            {coach.experience}年经验 · {coach.storeName}
          </Text>
          <Text className={styles.price}>
            ¥{coach.price}<Text className={styles.priceUnit}>/课时</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CoachCard
