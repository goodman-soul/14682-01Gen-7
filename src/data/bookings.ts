import type { Booking } from '@/types'

export const mockBookings: Booking[] = [
  {
    id: 'booking_001',
    type: 'course',
    itemId: 'course_001',
    itemName: '动感单车燃脂课',
    storeId: 'store_001',
    storeName: '国贸店',
    date: '2026-06-16',
    time: '19:00',
    status: 'confirmed',
    needCrossStoreConfirm: false,
    crossStoreConfirmed: true
  },
  {
    id: 'booking_002',
    type: 'coach',
    itemId: 'coach_001',
    itemName: '私教课程 - 张教练',
    storeId: 'store_001',
    storeName: '国贸店',
    date: '2026-06-17',
    time: '18:00',
    status: 'confirmed',
    needCrossStoreConfirm: false,
    crossStoreConfirmed: true
  },
  {
    id: 'booking_003',
    type: 'course',
    itemId: 'course_003',
    itemName: 'HIIT极限挑战',
    storeId: 'store_002',
    storeName: '望京店',
    date: '2026-06-16',
    time: '20:00',
    status: 'pending',
    needCrossStoreConfirm: true,
    crossStoreConfirmed: false
  },
  {
    id: 'booking_004',
    type: 'course',
    itemId: 'course_002',
    itemName: '流瑜伽放松课',
    storeId: 'store_001',
    storeName: '国贸店',
    date: '2026-06-15',
    time: '10:00',
    status: 'completed',
    needCrossStoreConfirm: false,
    crossStoreConfirmed: true
  },
  {
    id: 'booking_005',
    type: 'coach',
    itemId: 'coach_002',
    itemName: '私教课程 - 李教练',
    storeId: 'store_002',
    storeName: '望京店',
    date: '2026-06-14',
    time: '15:00',
    status: 'cancelled',
    needCrossStoreConfirm: true,
    crossStoreConfirmed: false
  }
]
