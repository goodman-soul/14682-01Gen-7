import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import classNames from 'classnames'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import { mockCoaches } from '@/data/coaches'
import CrossStoreTip from '@/components/CrossStoreTip'
import type { Coach } from '@/types'
import styles from './index.module.scss'

const CoachDetailPage: React.FC = () => {
  const router = useRouter()
  const coachId = router.params.id
  const { currentStore, isCrossStore } = useCurrentStore()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const coach = useMemo<Coach | undefined>(() => {
    return mockCoaches.find(c => c.id === coachId)
  }, [coachId])

  const crossStore = coach ? isCrossStore(coach.storeId) : false

  const handleBooking = useCallback(() => {
    if (!coach) return

    if (crossStore) {
      console.log('[CoachDetail] Show cross store confirm modal')
      setShowConfirmModal(true)
    } else {
      confirmBooking()
    }
  }, [coach, crossStore])

  const confirmBooking = useCallback(() => {
    console.log('[CoachDetail] Confirm booking coach:', coach?.id)
    setShowConfirmModal(false)

    Taro.showLoading({ title: '预约中...' })

    setTimeout(() => {
      Taro.hideLoading()

      if (crossStore) {
        Taro.showModal({
          title: '预约提交成功',
          content: '跨门店私教预约已提交，请等待门店审核确认。',
          showCancel: false,
          confirmText: '我知道了'
        })
      } else {
        Taro.showToast({
          title: '预约成功',
          icon: 'success'
        })
      }

      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    }, 1000)
  }, [coach, crossStore])

  const handleCancelConfirm = useCallback(() => {
    setShowConfirmModal(false)
  }, [])

  if (!coach) {
    return (
      <View className={styles.coachDetailPage}>
        <View style={{ textAlign: 'center', padding: '100rpx 0' }}>
          <Text style={{ color: '#86909C' }}>教练不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className={styles.coachDetailPage}>
      <View className={styles.header}>
        <View className={styles.coachInfo}>
          <Image
            className={styles.avatar}
            src={coach.avatar}
            mode='aspectFill'
            onError={(e) => console.error('[CoachDetail] Image load error:', e)}
          />
          <View className={styles.info}>
            <Text className={styles.name}>{coach.name}</Text>
            <Text className={styles.store}>{coach.storeName}</Text>
            <View className={styles.stats}>
              <View className={styles.statItem}>
                <Text className={styles.value}>{coach.experience}</Text>
                <Text className={styles.label}>年经验</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.value}>{coach.rating}</Text>
                <Text className={styles.label}>评分</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.value}>500+</Text>
                <Text className={styles.label}>学员</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.content}>
        {crossStore && (
          <CrossStoreTip
            storeName={coach.storeName}
            currentStoreName={currentStore?.name}
          />
        )}

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>擅长领域</Text>
          <View className={styles.specialtyList}>
            {coach.specialty.map((item, index) => (
              <View key={index} className={styles.specialtyTag}>
                {item}
              </View>
            ))}
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>个人简介</Text>
          <Text className={styles.introText}>{coach.introduction}</Text>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>课程价格</Text>
          <View className={styles.priceInfo}>
            <Text className={styles.currency}>¥</Text>
            <Text className={styles.priceValue}>{coach.price}</Text>
            <Text className={styles.priceUnit}>/ 课时</Text>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.secondaryBtn} onClick={() => Taro.navigateBack()}>
          返回
        </Button>
        <Button className={styles.primaryBtn} onClick={handleBooking}>
          预约私教
        </Button>
      </View>

      {showConfirmModal && (
        <View className={styles.confirmModal} onClick={handleCancelConfirm}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>跨店预约确认</Text>
            <View className={styles.modalBody}>
              <Text>
                您正在预约<Text className={styles.highlight}>{coach.storeName}</Text>的
                <Text className={styles.highlight}>{coach.name}</Text>，
                当前门店为<Text className={styles.highlight}>{currentStore?.name}</Text>。
              </Text>
              <Text style={{ marginTop: '16rpx', display: 'block' }}>
                跨门店私教预约需要<Text className={styles.highlight}>门店审核确认</Text>，
                确认后将通过消息通知您。
              </Text>
            </View>
            <View className={styles.modalActions}>
              <Button className={styles.cancelBtn} onClick={handleCancelConfirm}>
                取消
              </Button>
              <Button className={styles.confirmBtn} onClick={confirmBooking}>
                确认预约
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

export default CoachDetailPage
