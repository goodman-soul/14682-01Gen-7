import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import styles from './index.module.scss'

const EntryCodePage: React.FC = () => {
  const { currentStore, stores, setCurrentStore } = useCurrentStore()
  const [entryCode, setEntryCode] = useState('')
  const [expireTime, setExpireTime] = useState('')
  const [countdown, setCountdown] = useState(60)

  const generateCode = useCallback(() => {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    setEntryCode(code)

    const now = new Date()
    now.setMinutes(now.getMinutes() + 5)
    setExpireTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
    setCountdown(300)

    console.log('[EntryCode] Generated new code:', code)
  }, [])

  useEffect(() => {
    generateCode()
  }, [generateCode])

  useEffect(() => {
    if (countdown <= 0) {
      generateCode()
      return
    }

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown, generateCode])

  const handleStoreSelect = useCallback(() => {
    console.log('[EntryCode] Navigate to store select')
    Taro.navigateTo({
      url: '/pages/store-select/index'
    })
  }, [])

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <View className={styles.entryCodePage}>
      <View className={styles.storeInfo}>
        <Text className={styles.storeName}>{currentStore?.name || '请选择门店'}</Text>
        <Text className={styles.storeAddress}>{currentStore?.address || ''}</Text>
      </View>

      <View className={styles.qrCard}>
        <View className={styles.cardHeader}>
          <Text className={styles.title}>入场二维码</Text>
          <Text className={styles.subtitle}>请向工作人员出示此码</Text>
        </View>
        <View className={styles.qrContainer}>
          <View className={styles.centerLogo}>健</View>
        </View>
        <Text className={styles.codeNumber}>{entryCode}</Text>
        <View className={styles.expireInfo}>
          <Text>有效期至 </Text>
          <Text className={styles.time}>{expireTime}</Text>
          <Text> ({formatCountdown(countdown)}后刷新</Text>
        </View>
      </View>

      <Button className={styles.refreshBtn} onClick={generateCode}>
        刷新入场码
      </Button>

      <Button className={styles.storeSelectBtn} onClick={handleStoreSelect}>
        切换入场门店
      </Button>

      <View className={styles.tipsCard} style={{ marginTop: '32rpx' }}>
        <Text className={styles.tipsTitle}>使用说明</Text>
        <View className={styles.tipsList}>
          <View className={styles.tipItem}>
            <View className={styles.tipIcon}>1</View>
            <Text className={styles.tipText}>请在门店入口处向工作人员出示此二维码或数字码</Text>
          </View>
          <View className={styles.tipItem}>
            <View className={styles.tipIcon}>2</View>
            <Text className={styles.tipText}>入场码每5分钟自动刷新，请勿截图长期保存</Text>
          </View>
          <View className={styles.tipItem}>
            <View className={styles.tipIcon}>3</View>
            <Text className={styles.tipText}>跨门店入场需确认会员身份，感谢配合</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default EntryCodePage
