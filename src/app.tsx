import React, { useEffect } from 'react'
import { useDidShow, useDidHide } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { useTheme } from '@/hooks/useTheme'
import './app.scss'

function App(props) {
  const { themeClass } = useTheme()

  useEffect(() => {
    console.log('[App] App component mounted')
  }, [])

  useDidShow(() => {
    console.log('[App] App showed')
  })

  useDidHide(() => {
    console.log('[App] App hided')
  })

  return (
    <View className={themeClass}>
      {props.children}
    </View>
  )
}

export default App
