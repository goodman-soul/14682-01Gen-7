import React from 'react'
import { View, Text } from '@tarojs/components'
import styles from './index.module.scss'

interface CrossStoreTipProps {
  storeName: string
  currentStoreName?: string
}

const CrossStoreTip: React.FC<CrossStoreTipProps> = ({ storeName, currentStoreName }) => {
  return (
    <View className={styles.crossStoreTip}>
      <View className={styles.warningIcon}>!</View>
      <View className={styles.tipContent}>
        <Text className={styles.tipTitle}>跨门店预约提示</Text>
        <Text className={styles.tipDesc}>
          当前门店为{currentStoreName || '默认门店'}，该课程/教练属于{storeName}，
          预约后需要门店额外确认，请耐心等待审核。
        </Text>
      </View>
    </View>
  )
}

export default CrossStoreTip
