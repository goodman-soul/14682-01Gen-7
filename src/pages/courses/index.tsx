import React, { useState, useMemo, useCallback } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import classNames from 'classnames'
import { useCurrentStore } from '@/hooks/useCurrentStore'
import CourseCard from '@/components/CourseCard'
import { mockCourses } from '@/data/courses'
import type { Course } from '@/types'
import styles from './index.module.scss'

const CoursesPage: React.FC = () => {
  const { currentStore, isCrossStore } = useCurrentStore()
  const [storeScope, setStoreScope] = useState<'current' | 'all'>('current')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [refreshing, setRefreshing] = useState(false)

  const categories = useMemo(() => {
    const cats = new Set(mockCourses.map(c => c.category))
    return ['all', ...Array.from(cats)]
  }, [])

  const filteredCourses = useMemo(() => {
    let courses = [...mockCourses]

    if (storeScope === 'current' && currentStore) {
      courses = courses.filter(c => c.storeId === currentStore.id)
    }

    if (activeCategory !== 'all') {
      courses = courses.filter(c => c.category === activeCategory)
    }

    return courses.sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return a.startTime.localeCompare(b.startTime)
    })
  }, [storeScope, activeCategory, currentStore])

  const hasCrossStoreCourses = useMemo(() => {
    return filteredCourses.some(c => isCrossStore(c.storeId) && c.needCrossStoreConfirm)
  }, [filteredCourses, isCrossStore])

  usePullDownRefresh(() => {
    setRefreshing(true)
    console.log('[Courses] Pull down refresh triggered')
    setTimeout(() => {
      setRefreshing(false)
      Taro.stopPullDownRefresh()
    }, 1000)
  })

  const handleStoreScopeChange = useCallback((scope: 'current' | 'all') => {
    console.log('[Courses] Store scope changed:', scope)
    setStoreScope(scope)
  }, [])

  const handleCategoryChange = useCallback((category: string) => {
    console.log('[Courses] Category changed:', category)
    setActiveCategory(category)
  }, [])

  const getCategoryLabel = (cat: string) => {
    if (cat === 'all') return '全部'
    return cat
  }

  return (
    <View className={styles.coursesPage}>
      <View className={styles.filterSection}>
        <View className={styles.storeFilter}>
          <Button
            className={classNames(styles.filterBtn, storeScope === 'current' && styles.active)}
            onClick={() => handleStoreScopeChange('current')}
          >
            {currentStore?.name || '当前门店'}
          </Button>
          <Button
            className={classNames(styles.filterBtn, storeScope === 'all' && styles.active)}
            onClick={() => handleStoreScopeChange('all')}
          >
            全部门店
          </Button>
        </View>
        <ScrollView
          className={styles.categoryScroll}
          scrollX
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((cat) => (
            <View key={cat} className={styles.categoryItem}>
              <Button
                className={classNames(styles.categoryBtn, activeCategory === cat && styles.active)}
                onClick={() => handleCategoryChange(cat)}
              >
                {getCategoryLabel(cat)}
              </Button>
            </View>
          ))}
        </ScrollView>
      </View>

      {storeScope === 'all' && hasCrossStoreCourses && (
        <View className={styles.crossStoreBanner}>
          <View className={styles.bannerContent}>
            <View className={styles.bannerIcon}>!</View>
            <View className={styles.bannerText}>
              <Text className={styles.bannerTitle}>跨门店预约提示</Text>
              <Text className={styles.bannerDesc}>
                标记"跨店"的课程属于其他门店，预约后需要门店审核确认，请留意审核状态。
              </Text>
            </View>
          </View>
        </View>
      )}

      <View className={styles.courseList}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: Course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📋</Text>
            <Text className={styles.emptyText}>暂无符合条件的课程</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default CoursesPage
