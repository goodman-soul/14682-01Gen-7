import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { mockBookings } from '@/data/bookings'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import type { Booking } from '@/types'
import styles from './index.module.scss'

type TabType = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'

const tabs: { key: TabType; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待确认' },
  { key: 'confirmed', label: '已确认' },
  { key: 'completed', label: '已完成' },
  { key: 'cancelled', label: '已取消' }
]

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: '待确认', className: 'pending' },
  confirmed: { label: '已确认', className: 'confirmed' },
  completed: { label: '已完成', className: 'completed' },
  cancelled: { label: '已取消', className: 'cancelled' }
}

const BookingListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const { currentStore, isCrossStore } = useCurrentStore()

  const filteredBookings = useMemo(() => {
    return mockBookings.filter(booking => {
      if (activeTab === 'all') return true
      return booking.status === activeTab
    })
  }, [activeTab])

  const getTypeIcon = (type: string) => {
    return type === 'course' ? '📚' : '👤'
  }

  const getTypeLabel = (type: string) => {
    return type === 'course' ? '团体课程' : '私人教练'
  }

  const handleCancel = useCallback((booking: Booking) => {
    console.log('[BookingList] Cancel booking:', booking.id)
    Taro.showModal({
      title: '取消预约',
      content: `确定要取消「${booking.itemName}」的预约吗？`,
      confirmColor: '#FF4D4F',
      success: (res) => {
        if (res.confirm) {
          Taro.showLoading({ title: '取消中...' })
          setTimeout(() => {
            Taro.hideLoading()
            Taro.showToast({
              title: '已取消',
              icon: 'success'
            })
          }, 800)
        }
      }
    })
  }, [])

  const handleGoBook = useCallback(() => {
    Taro.switchTab({ url: '/pages/courses/index' })
  }, [])

  const handleViewDetail = useCallback((booking: Booking) => {
    console.log('[BookingList] View detail:', booking.id)
    const url = booking.type === 'course'
      ? `/pages/course-detail/index?id=${booking.itemId}`
      : `/pages/coach-detail/index?id=${booking.itemId}`
    Taro.navigateTo({ url })
  }, [])

  return (
    <View className={styles.bookingListPage}>
      <View className={styles.tabBar}>
        {tabs.map(tab => (
          <View
            key={tab.key}
            className={classNames(styles.tabItem, activeTab === tab.key && styles.active)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </View>
        ))}
      </View>

      {filteredBookings.length > 0 ? (
        <View className={styles.bookingList}>
          {filteredBookings.map(booking => {
            const status = statusMap[booking.status]
            const isCross = isCrossStore(booking.storeId)
            const showCrossAlert = booking.status === 'pending' && booking.needCrossStoreConfirm && !booking.crossStoreConfirmed

            return (
              <View key={booking.id} className={styles.bookingCard}>
                <View className={styles.cardHeader}>
                  <View className={styles.typeInfo}>
                    <View className={classNames(styles.typeIcon, styles[booking.type])}>
                      {getTypeIcon(booking.type)}
                    </View>
                    <Text className={styles.typeLabel}>{getTypeLabel(booking.type)}</Text>
                  </View>
                  <View className={classNames(styles.statusBadge, styles[status.className])}>
                    {status.label}
                  </View>
                </View>

                <Text className={styles.itemName}>{booking.itemName}</Text>

                <View className={styles.bookingMeta}>
                  <View className={styles.metaItem}>
                    <Text className={styles.metaIcon}>📍</Text>
                    <Text>{booking.storeName}</Text>
                    {isCross && (
                      <View className={styles.crossStoreTag}>
                        <Text className={styles.tagIcon}>跨</Text>
                        <Text>跨店</Text>
                      </View>
                    )}
                  </View>
                  <View className={styles.metaItem}>
                    <Text className={styles.metaIcon}>📅</Text>
                    <Text>{booking.date}</Text>
                  </View>
                  <View className={styles.metaItem}>
                    <Text className={styles.metaIcon}>⏰</Text>
                    <Text>{booking.time}</Text>
                  </View>
                </View>

                {showCrossAlert && (
                  <View className={styles.crossStoreAlert}>
                    <Text className={styles.alertIcon}>⚠️</Text>
                    <Text className={styles.alertText}>
                      此为跨店预约，需等待{booking.storeName}审核确认后生效，请耐心等待
                    </Text>
                  </View>
                )}

                {(booking.status === 'confirmed' || booking.status === 'pending') && (
                  <View className={styles.cardActions}>
                    <Button
                      className={classNames(styles.actionBtn, styles.secondary)}
                      onClick={() => handleViewDetail(booking)}
                    >
                      查看详情
                    </Button>
                    <Button
                      className={classNames(styles.actionBtn, styles.danger)}
                      onClick={() => handleCancel(booking)}
                    >
                      取消预约
                    </Button>
                  </View>
                )}

                {booking.status === 'completed' && (
                  <View className={styles.cardActions}>
                    <Button
                      className={classNames(styles.actionBtn, styles.primary)}
                      onClick={() => handleViewDetail(booking)}
                    >
                      再次预约
                    </Button>
                  </View>
                )}
              </View>
            )
          })}
        </View>
      ) : (
        <View className={styles.emptyState}>
          <Text className={styles.emptyIcon}>📋</Text>
          <Text className={styles.emptyText}>暂无{tabs.find(t => t.key === activeTab)?.label}预约记录</Text>
          <Button className={styles.goBtn} onClick={handleGoBook}>
            去预约课程
          </Button>
        </View>
      )}
    </View>
  )
}

export default BookingListPage
