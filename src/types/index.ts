export type ThemeType = 'orange' | 'blue' | 'dark'

export interface ThemeConfig {
  name: string
  type: ThemeType
  primary: string
}

export interface Store {
  id: string
  name: string
  address: string
  phone: string
  businessHours: string
  equipmentStatus: EquipmentStatus[]
  coverImage: string
  distance: string
  isDefault: boolean
}

export interface EquipmentStatus {
  name: string
  total: number
  available: number
  status: 'normal' | 'busy' | 'full'
}

export interface Coach {
  id: string
  name: string
  avatar: string
  specialty: string[]
  experience: number
  rating: number
  storeId: string
  storeName: string
  introduction: string
  price: number
}

export interface Course {
  id: string
  name: string
  description: string
  coverImage: string
  coachId: string
  coachName: string
  storeId: string
  storeName: string
  category: string
  duration: number
  capacity: number
  enrolled: number
  price: number
  startTime: string
  date: string
  needCrossStoreConfirm: boolean
}

export interface WalletInfo {
  balance: number
  totalRecharge: number
  totalConsume: number
  cards: WalletCard[]
  transactions: Transaction[]
}

export interface WalletCard {
  id: string
  name: string
  balance: number
  expireDate: string
}

export interface Transaction {
  id: string
  type: 'recharge' | 'consume'
  amount: number
  description: string
  time: string
  storeName: string
}

export interface Booking {
  id: string
  type: 'course' | 'coach'
  itemId: string
  itemName: string
  storeId: string
  storeName: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  needCrossStoreConfirm: boolean
  crossStoreConfirmed: boolean
}

export interface EntryCode {
  code: string
  storeId: string
  storeName: string
  expireTime: string
  qrCodeUrl: string
}
