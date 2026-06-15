import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import type { Store } from '@/types'
import styles from './index.module.scss'

interface StoreCardProps {
  store: Store
  selected?: boolean
  onClick?: () => void
}

const StoreCard: React.FC<StoreCardProps> = ({ store, selected, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'success'
      case 'busy':
        return 'warning'
      case 'full':
        return 'error'
      default:
        return 'success'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return '空闲'
      case 'busy':
        return '紧张'
      case 'full':
        return '已满'
      default:
        return '空闲'
    }
  }

  return (
    <View
      className={classNames(styles.storeCard, selected && styles.selected)}
      onClick={onClick}
    >
      <View className={styles.header}>
        <View className={styles.storeInfo}>
          <Text className={styles.storeName}>{store.name}</Text>
          {store.isDefault && (
            <View className={styles.defaultTag}>默认</View>
          )}
        </View>
        <Text className={styles.distance}>{store.distance}</Text>
      </View>
      <Text className={styles.address}>{store.address}</Text>
      <View className={styles.businessHours}>
        <Text className={styles.label}>营业时间:</Text>
        <Text className={styles.value}>{store.businessHours}</Text>
      </View>
      <View className={styles.equipmentList}>
        {store.equipmentStatus.slice(0, 4).map((eq, index) => (
          <View key={index} className={styles.equipmentItem}>
            <Text className={styles.eqName}>{eq.name}</Text>
            <View className={classNames(styles.eqStatus, styles[`status${getStatusColor(eq.status)}`])}>
              {getStatusText(eq.status)}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default StoreCard
