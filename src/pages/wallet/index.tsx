import React, { useState, useCallback } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { rechargePackages } from '@/data/wallet'
import { useWalletStore } from '@/store/useWalletStore'
import type { Transaction } from '@/types'
import styles from './index.module.scss'

const WalletPage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>('pkg_002')
  const [activeTab, setActiveTab] = useState<'cards' | 'transactions'>('transactions')
  const { balance, totalRecharge, totalConsume, cards, transactions, recharge } = useWalletStore()

  const handleRecharge = useCallback(() => {
    const pkg = rechargePackages.find(p => p.id === selectedPackage)
    if (!pkg) return

    console.log('[Wallet] Recharge package:', pkg.id)
    Taro.showLoading({ title: '充值中...' })

    setTimeout(() => {
      Taro.hideLoading()
      const result = recharge(pkg)
      Taro.showToast({
        title: result.message,
        icon: 'success'
      })
    }, 800)
  }, [selectedPackage, recharge])

  const getTxIcon = (type: string) => {
    return type === 'recharge' ? '↑' : '↓'
  }

  return (
    <View className={styles.walletPage}>
      <View className={styles.balanceCard}>
        <Text className={styles.label}>账户余额</Text>
        <View className={styles.balance}>
          <Text className={styles.currency}>¥</Text>
          <Text className={styles.value}>{balance.toFixed(2)}</Text>
        </View>
        <View className={styles.stats}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>¥{totalRecharge.toFixed(0)}</Text>
            <Text className={styles.statLabel}>累计充值</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>¥{totalConsume.toFixed(0)}</Text>
            <Text className={styles.statLabel}>累计消费</Text>
          </View>
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>充值套餐</Text>
        <View className={styles.rechargePackages}>
          {rechargePackages.map((pkg) => (
            <View
              key={pkg.id}
              className={classNames(
                styles.packageCard,
                selectedPackage === pkg.id && styles.selected
              )}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <View className={styles.amount}>
                <Text className={styles.currency}>¥</Text>
                {pkg.amount}
              </View>
              <View className={styles.bonus}>送{pkg.bonus}元</View>
              <View className={styles.desc}>{pkg.description}</View>
            </View>
          ))}
        </View>
      </View>

      <Button className={styles.rechargeBtn} onClick={handleRecharge}>
        立即充值
      </Button>

      <View className={styles.section} style={{ marginTop: '32rpx' }}>
        <Text className={styles.sectionTitle}>我的储值卡</Text>
        <View className={styles.cardList}>
          {cards.map((card) => (
            <View key={card.id} className={styles.cardItem}>
              <View className={styles.cardInfo}>
                <Text className={styles.cardName}>{card.name}</Text>
                <Text className={styles.expireDate}>有效期至 {card.expireDate}</Text>
              </View>
              <View className={styles.cardBalance}>
                <Text className={styles.balanceValue}>
                  <Text className={styles.currency}>¥</Text>
                  {card.balance.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>交易记录</Text>
        <View className={styles.transactionList}>
          {transactions.map((tx: Transaction) => (
            <View key={tx.id} className={styles.txItem}>
              <View className={classNames(styles.txIcon, styles[tx.type])}>
                {getTxIcon(tx.type)}
              </View>
              <View className={styles.txInfo}>
                <Text className={styles.txDesc}>{tx.description}</Text>
                <Text className={styles.txMeta}>{tx.time} · {tx.storeName}</Text>
              </View>
              <View className={styles.txAmount}>
                <Text className={classNames(styles.amountValue, styles[tx.type])}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default WalletPage
