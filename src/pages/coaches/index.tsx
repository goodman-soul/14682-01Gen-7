import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import classNames from 'classnames'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import CoachCard from '@/components/CoachCard'
import { mockCoaches } from '@/data/coaches'
import type { Coach } from '@/types'
import styles from './index.module.scss'

const CoachesPage: React.FC = () => {
  const { currentStore, stores, isCrossStore } = useCurrentStore()
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all')
  const [refreshing, setRefreshing] = useState(false)

  const filteredCoaches = useMemo(() => {
    let coaches = [...mockCoaches]

    if (selectedStoreId !== 'all') {
      coaches = coaches.filter(c => c.storeId === selectedStoreId)
    }

    return coaches.sort((a, b) => b.rating - a.rating)
  }, [selectedStoreId])

  const hasCrossStoreCoaches = useMemo(() => {
    return selectedStoreId === 'all' && filteredCoaches.some(c => isCrossStore(c.storeId))
  }, [selectedStoreId, filteredCoaches, isCrossStore])

  usePullDownRefresh(() => {
    setRefreshing(true)
    console.log('[Coaches] Pull down refresh triggered')
    setTimeout(() => {
      setRefreshing(false)
      Taro.stopPullDownRefresh()
    }, 1000)
  })

  const handleStoreSelect = useCallback((storeId: string) => {
    console.log('[Coaches] Store selected:', storeId)
    setSelectedStoreId(storeId)
  }, [])

  return (
    <View className={styles.coachesPage}>
      <View className={styles.filterSection}>
        <ScrollView
          className={styles.storeScroll}
          scrollX
          showsHorizontalScrollIndicator={false}
        >
          <View className={styles.storeItem}>
            <Button
              className={classNames(styles.storeBtn, selectedStoreId === 'all' && styles.active)}
              onClick={() => handleStoreSelect('all')}
            >
              全部教练
            </Button>
          </View>
          {stores.map((store) => (
            <View key={store.id} className={styles.storeItem}>
              <Button
                className={classNames(styles.storeBtn, selectedStoreId === store.id && styles.active)}
                onClick={() => handleStoreSelect(store.id)}
              >
                {store.name.replace('力健健身(', '').replace(')', '')}
              </Button>
            </View>
          ))}
        </ScrollView>
      </View>

      {hasCrossStoreCoaches && (
        <View className={styles.crossStoreTip}>
          <Text className={styles.tipText}>
            <Text className={styles.highlight}>温馨提示：</Text>
            标记"跨"的教练属于其他门店，预约私教需要该门店审核确认。
          </Text>
        </View>
      )}

      <View className={styles.coachList}>
        {filteredCoaches.length > 0 ? (
          filteredCoaches.map((coach: Coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🏋️</Text>
            <Text className={styles.emptyText}>暂无符合条件的教练</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default CoachesPage
