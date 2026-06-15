import { useStoreStore } from '@/store/useStoreStore'

export function useCurrentStore() {
  const { currentStoreId, stores, setCurrentStore, getCurrentStore, getStoreById } = useStoreStore()

  const currentStore = getCurrentStore()

  const isCrossStore = (storeId: string) => {
    return currentStoreId && storeId !== currentStoreId
  }

  return {
    currentStoreId,
    currentStore,
    stores,
    setCurrentStore,
    getCurrentStore,
    getStoreById,
    isCrossStore
  }
}
