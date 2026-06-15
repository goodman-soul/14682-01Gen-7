import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import type { Course } from '@/types'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import styles from './index.module.scss'

interface CourseCardProps {
  course: Course
  onClick?: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const { isCrossStore, currentStore } = useCurrentStore()
  const crossStore = isCrossStore(course.storeId)
  const progress = Math.round((course.enrolled / course.capacity) * 100)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      Taro.navigateTo({
        url: `/pages/course-detail/index?id=${course.id}`
      })
    }
  }

  return (
    <View className={styles.courseCard} onClick={handleClick}>
      <Image
        className={styles.cover}
        src={course.coverImage}
        mode='aspectFill'
        onError={(e) => console.error('[CourseCard] Image load error:', e)}
      />
      <View className={styles.content}>
        <View className={styles.header}>
          <Text className={styles.name}>{course.name}</Text>
          <View className={classNames(styles.tag, crossStore && styles.tagWarning)}>
            {crossStore ? '跨店' : course.storeName}
          </View>
        </View>
        <View className={styles.meta}>
          <Text className={styles.metaItem}>{course.coachName}</Text>
          <Text className={styles.metaDivider}>·</Text>
          <Text className={styles.metaItem}>{course.duration}分钟</Text>
          <Text className={styles.metaDivider}>·</Text>
          <Text className={styles.metaItem}>{course.startTime}</Text>
        </View>
        <View className={styles.progressBar}>
          <View className={styles.progressFill} style={{ width: `${progress}%` }} />
        </View>
        <View className={styles.footer}>
          <Text className={styles.enrolled}>
            {course.enrolled}/{course.capacity}人已报名
          </Text>
          {crossStore && course.needCrossStoreConfirm && (
            <Text className={styles.crossTip}>需确认</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default CourseCard
