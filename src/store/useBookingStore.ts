import { create } from 'zustand'
import type { Booking, Coach, Course } from '@/types'
import { mockBookings } from '@/data/bookings'
import { useWalletStore } from './useWalletStore'

interface BookingState {
  bookings: Booking[]
  addCourseBooking: (course: Course, isCrossStore: boolean) => { success: boolean; message: string; booking?: Booking }
  addCoachBooking: (coach: Coach, isCrossStore: boolean, date?: string, time?: string) => { success: boolean; message: string; booking?: Booking }
  cancelBooking: (bookingId: string) => { success: boolean; message: string }
  getBookings: () => Booking[]
  getBookingsByStatus: (status: Booking['status']) => Booking[]
}

const generateBookingId = () => `booking_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

const formatDate = () => {
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = Math.floor(now.getMinutes() / 30) * 30
  return `${hours}:${String(minutes).padStart(2, '0')}`
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [...mockBookings],

  addCourseBooking: (course, isCrossStore) => {
    const { bookings } = get()
    const wallet = useWalletStore.getState()

    const consumeResult = wallet.consume(
      course.price,
      `团体课程 - ${course.name}`,
      course.storeName
    )

    if (!consumeResult.success && course.price > 0) {
      return { success: false, message: consumeResult.message }
    }

    const booking: Booking = {
      id: generateBookingId(),
      type: 'course',
      itemId: course.id,
      itemName: course.name,
      storeId: course.storeId,
      storeName: course.storeName,
      date: course.date || formatDate(),
      time: course.startTime || formatTime(),
      status: isCrossStore && course.needCrossStoreConfirm ? 'pending' : 'confirmed',
      needCrossStoreConfirm: isCrossStore && course.needCrossStoreConfirm,
      crossStoreConfirmed: !(isCrossStore && course.needCrossStoreConfirm)
    }

    set({ bookings: [booking, ...bookings] })
    return { success: true, message: '预约成功', booking }
  },

  addCoachBooking: (coach, isCrossStore, date, time) => {
    const { bookings } = get()
    const wallet = useWalletStore.getState()

    const consumeResult = wallet.consume(
      coach.price,
      `私教课程消费 - ${coach.name}`,
      coach.storeName
    )

    if (!consumeResult.success && coach.price > 0) {
      return { success: false, message: consumeResult.message }
    }

    const booking: Booking = {
      id: generateBookingId(),
      type: 'coach',
      itemId: coach.id,
      itemName: `私教课程 - ${coach.name}`,
      storeId: coach.storeId,
      storeName: coach.storeName,
      date: date || formatDate(),
      time: time || formatTime(),
      status: isCrossStore ? 'pending' : 'confirmed',
      needCrossStoreConfirm: isCrossStore,
      crossStoreConfirmed: !isCrossStore
    }

    set({ bookings: [booking, ...bookings] })
    return { success: true, message: '预约成功', booking }
  },

  cancelBooking: (bookingId) => {
    const { bookings } = get()
    const booking = bookings.find(b => b.id === bookingId)

    if (!booking) {
      return { success: false, message: '预约不存在' }
    }

    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return { success: false, message: '该预约无法取消' }
    }

    set({
      bookings: bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
      )
    })

    return { success: true, message: '已取消' }
  },

  getBookings: () => {
    return get().bookings
  },

  getBookingsByStatus: (status) => {
    return get().bookings.filter(b => b.status === status)
  }
}))
