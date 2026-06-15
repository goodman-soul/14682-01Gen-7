import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, Image, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import classNames from 'classnames'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import { mockCourses } from '@/data/courses'
import CrossStoreTip from '@/components/CrossStoreTip'
import type { Course } from '@/types'
import styles from './index.module.scss'

const CourseDetailPage: React.FC = () => {
  const router = useRouter()
  const courseId = router.params.id
  const { currentStore, isCrossStore } = useCurrentStore()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const course = useMemo<Course | undefined>(() => {
    return mockCourses.find(c => c.id === courseId)
  }, [courseId])

  const crossStore = course ? isCrossStore(course.storeId) : false
  const progress = course ? Math.round((course.enrolled / course.capacity) * 100) : 0
  const isFull = course ? course.enrolled >= course.capacity : false

  const handleBooking = useCallback(() => {
    if (!course) return

    if (isFull) {
      Taro.showToast({
        title: '课程已满',
        icon: 'none'
      })
      return
    }

    if (crossStore && course.needCrossStoreConfirm) {
      console.log('[CourseDetail] Show cross store confirm modal')
      setShowConfirmModal(true)
    } else {
      confirmBooking()
    }
  }, [course, crossStore, isFull])

  const confirmBooking = useCallback(() => {
    console.log('[CourseDetail] Confirm booking course:', course?.id)
    setShowConfirmModal(false)

    Taro.showLoading({ title: '预约中...' })

    setTimeout(() => {
      Taro.hideLoading()

      if (crossStore && course?.needCrossStoreConfirm) {
        Taro.showModal({
          title: '预约提交成功',
          content: '跨门店预约已提交，请等待门店审核确认。',
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
  }, [course, crossStore])

  const handleCancelConfirm = useCallback(() => {
    setShowConfirmModal(false)
  }, [])

  if (!course) {
    return (
      <View className={styles.courseDetailPage}>
        <View style={{ textAlign: 'center', padding: '100rpx 0' }}>
          <Text style={{ color: '#86909C' }}>课程不存在</Text>
        </View>
      </View>
    )
  }

  return (
    <View className={styles.courseDetailPage}>
      <Image
        className={styles.coverImage}
        src={course.coverImage}
        mode='aspectFill'
        onError={(e) => console.error('[CourseDetail] Image load error:', e)}
      />

      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.title}>{course.name}</Text>
          <View className={styles.tags}>
            <View className={styles.tag}>{course.category}</View>
            <View className={styles.tag}>{course.duration}分钟</View>
            {crossStore && (
              <View className={classNames(styles.tag, styles.tagWarning)}>
                跨店预约
              </View>
            )}
          </View>
          <View className={styles.metaRow}>
            <View className={styles.metaItem}>
              <Text className={styles.icon}>📍</Text>
              <Text>{course.storeName}</Text>
            </View>
            <View className={styles.metaItem}>
              <Text className={styles.icon}>👤</Text>
              <Text>{course.coachName}</Text>
            </View>
          </View>
        </View>

        {crossStore && course.needCrossStoreConfirm && (
          <CrossStoreTip
            storeName={course.storeName}
            currentStoreName={currentStore?.name}
          />
        )}

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>课程时间</Text>
          <View className={styles.sectionContent}>
            {course.date} {course.startTime}
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>课程介绍</Text>
          <View className={styles.sectionContent}>{course.description}</View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>授课教练</Text>
          <View className={styles.coachInfo}>
            <Image
              className={styles.avatar}
              src='https://picsum.photos/id/64/200/200'
              mode='aspectFill'
            />
            <View className={styles.info}>
              <Text className={styles.name}>{course.coachName}</Text>
              <Text className={styles.meta}>{course.storeName}</Text>
            </View>
          </View>
        </View>

        <View className={styles.section}>
          <Text className={styles.sectionTitle}>报名情况</Text>
          <View className={styles.enrollInfo}>
            <View className={styles.progressSection}>
              <View className={styles.progressLabel}>
                <Text>
                  已报名 <Text className={styles.enrolled}>{course.enrolled}</Text>/{course.capacity}
                </Text>
                <Text>{progress}%</Text>
              </View>
              <View className={styles.progressBar}>
                <View className={styles.progressFill} style={{ width: `${progress}%` }} />
              </View>
            </View>
            <View className={styles.price}>
              <View className={styles.priceValue}>
                <Text className={styles.currency}>¥</Text>
                {course.price > 0 ? course.price : '免费'}
              </View>
              <Text className={styles.priceLabel}>会员价</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.bottomBar}>
        <Button className={styles.secondaryBtn} onClick={() => Taro.navigateBack()}>
          返回
        </Button>
        <Button
          className={classNames(styles.primaryBtn, isFull && styles.disabled)}
          onClick={handleBooking}
          disabled={isFull}
        >
          {isFull ? '已满员' : '立即预约'}
        </Button>
      </View>

      {showConfirmModal && (
        <View className={styles.confirmModal} onClick={handleCancelConfirm}>
          <View className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>跨店预约确认</Text>
            <View className={styles.modalBody}>
              <Text>
                您正在预约<Text className={styles.highlight}>{course.storeName}</Text>的课程，
                当前门店为<Text className={styles.highlight}>{currentStore?.name}</Text>。
              </Text>
              <Text style={{ marginTop: '16rpx', display: 'block' }}>
                跨门店预约需要<Text className={styles.highlight}>门店审核确认</Text>，
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

export default CourseDetailPage
