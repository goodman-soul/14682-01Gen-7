import React, { useState, useCallback } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import StoreCard from '@/components/StoreCard'
import type { Store } from '@/types'
import styles from './index.module.scss'

const StoreSelectPage: React.FC = () => {
  const { currentStore, stores, setCurrentStore } = useCurrentStore()
  const [selectedStoreId, setSelectedStoreId] = useState<string>(currentStore?.id || '')

  const handleStoreSelect = useCallback((storeId: string) => {
    console.log('[StoreSelect] Store selected:', storeId)
    setSelectedStoreId(storeId)
  }, [])

  const handleConfirm = useCallback(() => {
    if (!selectedStoreId) {
      Taro.showToast({
        title: '请选择门店',
        icon: 'none'
      })
      return
    }

    console.log('[StoreSelect] Confirm switch to store:', selectedStoreId)
    setCurrentStore(selectedStoreId)

    Taro.showToast({
      title: '门店切换成功',
      icon: 'success'
    })

    setTimeout(() => {
      Taro.navigateBack()
    }, 1000)
  }, [selectedStoreId, setCurrentStore])

  return (
    <View className={styles.storeSelectPage}>
      <Text className={styles.pageTitle}>选择门店</Text>

      {currentStore && (
        <View className={styles.currentStoreCard}>
          <Text className={styles.label}>当前门店</Text>
          <Text className={styles.storeName}>{currentStore.name}</Text>
          <Text className={styles.storeAddress}>{currentStore.address}</Text>
        </View>
      )}

      <Text className={styles.sectionTitle}>全部门店</Text>

      <View className={styles.storeList}>
        {stores.length > 0 ? (
          stores.map((store: Store) => (
            <View key={store.id} className={styles.storeItem}>
              <StoreCard
                store={store}
                selected={selectedStoreId === store.id}
                onClick={() => handleStoreSelect(store.id)}
              />
            </View>
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyText}>暂无门店信息</Text>
          </View>
        )}
      </View>

      <Button className={styles.confirmBtn} onClick={handleConfirm}>
        确认切换
      </Button>
    </View>
  )
}

export default StoreSelectPage
