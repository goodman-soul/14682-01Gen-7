import React, { useCallback } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useTheme } from '@/hooks/useTheme'
import { mockWalletInfo } from '@/data/wallet'
import ThemeSwitch from '@/components/ThemeSwitch'
import styles from './index.module.scss'

const MinePage: React.FC = () => {
  const { getNavigationBarColor } = useTheme()

  const navBarColor = getNavigationBarColor()
  Taro.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: navBarColor,
    animation: {
      duration: 300,
      timingFunc: 'easeIn'
    }
  })

  const handleNavigate = useCallback((url: string) => {
    console.log('[Mine] Navigate to:', url)
    Taro.navigateTo({ url })
  }, [])

  const handleRecharge = useCallback(() => {
    console.log('[Mine] Recharge clicked')
    Taro.navigateTo({ url: '/pages/wallet/index' })
  }, [])

  const menuItems = [
    { icon: 'icon1', text: '入场码', url: '/pages/entry-code/index' },
    { icon: 'icon2', text: '我的预约', url: '/pages/booking-list/index' },
    { icon: 'icon3', text: '门店切换', url: '/pages/store-select/index' },
    { icon: 'icon4', text: '储值中心', url: '/pages/wallet/index' },
    { icon: 'icon5', text: '联系客服', url: '' }
  ]

  return (
    <View className={styles.minePage}>
      <View className={styles.header}>
        <View className={styles.userInfo}>
          <View className={styles.avatar}>👤</View>
          <View className={styles.userMeta}>
            <Text className={styles.userName}>健身达人</Text>
            <Text className={styles.memberLevel}>钻石会员</Text>
          </View>
        </View>
      </View>

      <View className={styles.walletCard} onClick={handleRecharge}>
        <View className={styles.walletHeader}>
          <Text className={styles.walletTitle}>储值余额</Text>
          <Button className={styles.rechargeBtn}>充值</Button>
        </View>
        <View className={styles.balanceInfo}>
          <Text className={styles.balanceLabel}>当前余额</Text>
          <Text className={styles.balanceValue}>
            <Text className={styles.currency}>¥</Text>
            {mockWalletInfo.balance.toFixed(2)}
          </Text>
        </View>
        <View className={styles.walletStats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>¥{mockWalletInfo.totalRecharge.toFixed(0)}</Text>
            <Text className={styles.statLabel}>累计充值</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>¥{mockWalletInfo.totalConsume.toFixed(0)}</Text>
            <Text className={styles.statLabel}>累计消费</Text>
          </View>
        </View>
      </View>

      <View className={styles.menuSection}>
        {menuItems.map((item, index) => (
          <View
            key={index}
            className={styles.menuItem}
            onClick={() => item.url && handleNavigate(item.url)}
          >
            <View className={`${styles.menuIcon} ${styles[item.icon]}`}>
              {item.text.charAt(0)}
            </View>
            <Text className={styles.menuText}>{item.text}</Text>
            <Text className={styles.menuArrow}>›</Text>
          </View>
        ))}
      </View>

      <Text className={styles.sectionTitle}>主题设置</Text>
      <View className={styles.themeSection}>
        <ThemeSwitch />
      </View>
    </View>
  )
}

export default MinePage
