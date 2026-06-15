import { create } from 'zustand'
import type { WalletInfo, Transaction, WalletCard } from '@/types'
import { mockWalletInfo, mockWalletCards } from '@/data/wallet'

interface RechargePackage {
  id: string
  amount: number
  bonus: number
  description: string
}

interface WalletState {
  balance: number
  totalRecharge: number
  totalConsume: number
  cards: WalletCard[]
  transactions: Transaction[]
  recharge: (pkg: RechargePackage, storeName?: string) => { success: boolean; message: string }
  consume: (amount: number, description: string, storeName: string) => { success: boolean; message: string }
  addTransaction: (tx: Omit<Transaction, 'id' | 'time'>) => void
  getWalletInfo: () => WalletInfo
}

const generateTxId = () => `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const formatTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export const useWalletStore = create<WalletState>((set, get) => ({
  balance: mockWalletInfo.balance,
  totalRecharge: mockWalletInfo.totalRecharge,
  totalConsume: mockWalletInfo.totalConsume,
  cards: mockWalletCards,
  transactions: [...mockWalletInfo.transactions],

  recharge: (pkg, storeName = '线上') => {
    const { balance, totalRecharge, addTransaction } = get()
    const totalAmount = pkg.amount + pkg.bonus

    set({
      balance: balance + totalAmount,
      totalRecharge: totalRecharge + totalAmount
    })

    addTransaction({
      type: 'recharge',
      amount: pkg.amount,
      description: pkg.bonus > 0 ? `充值${pkg.amount}元，赠送${pkg.bonus}元` : '在线充值',
      storeName
    })

    if (pkg.bonus > 0) {
      addTransaction({
        type: 'recharge',
        amount: pkg.bonus,
        description: '充值赠送',
        storeName: '系统'
      })
    }

    return { success: true, message: '充值成功' }
  },

  consume: (amount, description, storeName) => {
    const { balance, totalConsume, addTransaction } = get()

    if (balance < amount) {
      return { success: false, message: '余额不足' }
    }

    set({
      balance: balance - amount,
      totalConsume: totalConsume + amount
    })

    addTransaction({
      type: 'consume',
      amount: -amount,
      description,
      storeName
    })

    return { success: true, message: '消费成功' }
  },

  addTransaction: (tx) => {
    const { transactions } = get()
    const newTx: Transaction = {
      ...tx,
      id: generateTxId(),
      time: formatTime()
    }
    set({
      transactions: [newTx, ...transactions]
    })
  },

  getWalletInfo: () => {
    const { balance, totalRecharge, totalConsume, cards, transactions } = get()
    return {
      balance,
      totalRecharge,
      totalConsume,
      cards,
      transactions
    }
  }
}))
