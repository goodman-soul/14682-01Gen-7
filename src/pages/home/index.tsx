import React, { useState, useCallback } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import { useTheme } from '@/hooks/useTheme'
import CourseCard from '@/components/CourseCard'
import { mockCourses } from '@/data/courses'
import type { Course, EquipmentStatus } from '@/types'
import styles from './index.module.scss'

const HomePage: React.FC = () => {
  const { currentStore, stores } = useCurrentStore()
  const { getNavigationBarColor } = useTheme()
  const [refreshing, setRefreshing] = useState(false)

  const storeCourses = mockCourses.filter(c => c.storeId === currentStore?.id)
  const otherCourses = mockCourses.filter(c => c.storeId !== currentStore?.id).slice(0, 2)
  const displayCourses = [...storeCourses, ...otherCourses].slice(0, 4)

  usePullDownRefresh(() => {
    setRefreshing(true)
    console.log('[Home] Pull down refresh triggered')
    setTimeout(() => {
      setRefreshing(false)
      Taro.stopPullDownRefresh()
    }, 1000)
  })

  const handleStoreSwitch = useCallback(() => {
    console.log('[Home] Navigate to store select')
    Taro.navigateTo({
      url: '/pages/store-select/index'
    })
  }, [])

  const handleEntryClick = useCallback((type: string) => {
    console.log('[Home] Quick entry clicked:', type)
    const urlMap: Record<string, string> = {
      entry: '/pages/entry-code/index',
      wallet: '/pages/wallet/index',
      booking: '/pages/booking-list/index',
      equipment: '/pages/store-select/index'
    }
    if (urlMap[type]) {
      Taro.navigateTo({ url: urlMap[type] })
    }
  }, [])

  const handleMoreCourses = useCallback(() => {
    console.log('[Home] Navigate to courses tab')
    Taro.switchTab({
      url: '/pages/courses/index'
    })
  }, [])

  const getStatusText = (status: string) => {
    const map: Record<string, string> = {
      normal: '空闲',
      busy: '紧张',
      full: '已满'
    }
    return map[status] || '空闲'
  }

  const navBarColor = getNavigationBarColor()
  Taro.setNavigationBarColor({
    frontColor: '#ffffff',
    backgroundColor: navBarColor,
    animation: {
      duration: 300,
      timingFunc: 'easeIn'
    }
  })

  return (
    <View className={styles.homePage}>
      <View className={styles.header}>
        <Text className={styles.greeting}>您好，欢迎回来 👋</Text>
        <View className={styles.storeCard} onClick={handleStoreSwitch}>
          <View className={styles.storeInfo}>
            <Text className={styles.storeName}>{currentStore?.name || '选择门店'}</Text>
            <View className={styles.storeMeta}>
              <Text className={styles.metaText}>{currentStore?.businessHours || '营业时间 --:--'}</Text>
              <View className={styles.dot} />
              <Text className={styles.metaText}>{currentStore?.distance || ''}</Text>
            </View>
          </View>
          <Button className={styles.switchBtn}>切换</Button>
        </View>
      </View>

      <View className={styles.quickEntry}>
        <View className={styles.entryList}>
          <View className={styles.entryItem} onClick={() => handleEntryClick('entry')}>
            <View className={`${styles.entryIcon} ${styles.icon1}`}>入</View>
            <Text className={styles.entryText}>入场码</Text>
          </View>
          <View className={styles.entryItem} onClick={() => handleEntryClick('wallet')}>
            <View className={`${styles.entryIcon} ${styles.icon2}`}>储</View>
            <Text className={styles.entryText}>储值中心</Text>
          </View>
          <View className={styles.entryItem} onClick={() => handleEntryClick('booking')}>
            <View className={`${styles.entryIcon} ${styles.icon3}`}>预</View>
            <Text className={styles.entryText}>我的预约</Text>
          </View>
          <View className={styles.entryItem} onClick={() => handleEntryClick('equipment')}>
            <View className={`${styles.entryIcon} ${styles.icon4}`}>设</View>
            <Text className={styles.entryText}>设备状态</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text className={styles.title}>设备状态</Text>
        </View>
        <ScrollView
          className={styles.equipmentScroll}
          scrollX
          showsHorizontalScrollIndicator={false}
        >
          {currentStore?.equipmentStatus.map((eq: EquipmentStatus, index: number) => (
            <View key={index} className={styles.equipmentItem}>
              <View className={styles.equipmentCard}>
                <Text className={styles.eqName}>{eq.name}</Text>
                <Text className={styles.eqCount}>
                  <Text className={styles.available}>{eq.available}</Text>
                  /{eq.total} 台可用
                </Text>
                <View className={`${styles.eqStatus} ${styles[eq.status]}`}>
                  {getStatusText(eq.status)}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className={styles.section}>
        <View className={styles.sectionTitle}>
          <Text className={styles.title}>推荐课程</Text>
          <Text className={styles.more} onClick={handleMoreCourses}>查看全部</Text>
        </View>
        <View className={styles.courseList}>
          {displayCourses.length > 0 ? (
            displayCourses.map((course: Course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <View className={styles.emptyState}>
              <Text className={styles.emptyText}>暂无推荐课程</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default HomePage
