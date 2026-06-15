import { create } from 'zustand'
import type { Store } from '@/types'
import { mockStores } from '@/data/stores'

interface StoreState {
  currentStoreId: string
  stores: Store[]
  setCurrentStore: (storeId: string) => void
  getCurrentStore: () => Store | undefined
  getStoreById: (storeId: string) => Store | undefined
}

export const useStoreStore = create<StoreState>((set, get) => ({
  currentStoreId: mockStores[0]?.id || '',
  stores: mockStores,
  setCurrentStore: (storeId: string) => {
    console.log('[Store] Switching to store:', storeId)
    set({ currentStoreId: storeId })
  },
  getCurrentStore: () => {
    const { currentStoreId, stores } = get()
    return stores.find(s => s.id === currentStoreId)
  },
  getStoreById: (storeId: string) => {
    const { stores } = get()
    return stores.find(s => s.id === storeId)
  }
}))
