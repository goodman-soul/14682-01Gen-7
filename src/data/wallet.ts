import type { WalletInfo, WalletCard, Transaction } from '@/types'

export const mockWalletCards: WalletCard[] = [
  {
    id: 'card_001',
    name: '钻石会员卡',
    balance: 2580.00,
    expireDate: '2027-12-31'
  },
  {
    id: 'card_002',
    name: '储值卡A',
    balance: 1500.00,
    expireDate: '2026-12-31'
  }
]

export const mockTransactions: Transaction[] = [
  {
    id: 'tx_001',
    type: 'consume',
    amount: -128.00,
    description: '私教课程消费 - 张教练',
    time: '2026-06-15 18:30',
    storeName: '国贸店'
  },
  {
    id: 'tx_002',
    type: 'recharge',
    amount: 1000.00,
    description: '在线充值',
    time: '2026-06-14 12:00',
    storeName: '线上'
  },
  {
    id: 'tx_003',
    type: 'consume',
    amount: -88.00,
    description: '团体课程 - 动感单车',
    time: '2026-06-13 20:00',
    storeName: '国贸店'
  },
  {
    id: 'tx_004',
    type: 'consume',
    amount: -256.00,
    description: '私教课程消费 - 李教练',
    time: '2026-06-12 15:00',
    storeName: '望京店'
  },
  {
    id: 'tx_005',
    type: 'recharge',
    amount: 2000.00,
    description: '门店充值',
    time: '2026-06-10 10:00',
    storeName: '国贸店'
  },
  {
    id: 'tx_006',
    type: 'consume',
    amount: -68.00,
    description: '团体课程 - 流瑜伽',
    time: '2026-06-09 19:00',
    storeName: '国贸店'
  },
  {
    id: 'tx_007',
    type: 'consume',
    amount: -300.00,
    description: '私教课程消费 - 张教练',
    time: '2026-06-08 17:00',
    storeName: '国贸店'
  },
  {
    id: 'tx_008',
    type: 'recharge',
    amount: 500.00,
    description: '活动赠送',
    time: '2026-06-01 00:00',
    storeName: '系统'
  }
]

export const mockWalletInfo: WalletInfo = {
  balance: 4080.00,
  totalRecharge: 3500.00,
  totalConsume: 840.00,
  cards: mockWalletCards,
  transactions: mockTransactions
}

export const rechargePackages = [
  { id: 'pkg_001', amount: 500, bonus: 50, description: '充500送50' },
  { id: 'pkg_002', amount: 1000, bonus: 150, description: '充1000送150' },
  { id: 'pkg_003', amount: 2000, bonus: 400, description: '充2000送400' },
  { id: 'pkg_004', amount: 5000, bonus: 1200, description: '充5000送1200' }
]
