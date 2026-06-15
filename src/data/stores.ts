import type { Store } from '@/types'

export const mockStores: Store[] = [
  {
    id: 'store_001',
    name: '力健健身(国贸店)',
    address: '北京市朝阳区建国门外大街1号',
    phone: '010-12345678',
    businessHours: '06:00 - 23:00',
    coverImage: 'https://picsum.photos/id/1080/750/400',
    distance: '1.2km',
    isDefault: true,
    equipmentStatus: [
      { name: '跑步机', total: 20, available: 8, status: 'normal' },
      { name: '力量器械', total: 30, available: 15, status: 'normal' },
      { name: '动感单车', total: 15, available: 3, status: 'busy' },
      { name: '游泳池', total: 1, available: 1, status: 'normal' }
    ]
  },
  {
    id: 'store_002',
    name: '力健健身(望京店)',
    address: '北京市朝阳区望京SOHO T1',
    phone: '010-87654321',
    businessHours: '07:00 - 22:00',
    coverImage: 'https://picsum.photos/id/1082/750/400',
    distance: '3.5km',
    isDefault: false,
    equipmentStatus: [
      { name: '跑步机', total: 25, available: 12, status: 'normal' },
      { name: '力量器械', total: 35, available: 20, status: 'normal' },
      { name: '动感单车', total: 20, available: 18, status: 'normal' },
      { name: '瑜伽室', total: 2, available: 1, status: 'normal' }
    ]
  },
  {
    id: 'store_003',
    name: '力健健身(中关村店)',
    address: '北京市海淀区中关村大街1号',
    phone: '010-11112222',
    businessHours: '06:30 - 22:30',
    coverImage: 'https://picsum.photos/id/1076/750/400',
    distance: '8.2km',
    isDefault: false,
    equipmentStatus: [
      { name: '跑步机', total: 30, available: 25, status: 'normal' },
      { name: '力量器械', total: 40, available: 30, status: 'normal' },
      { name: '动感单车', total: 25, available: 0, status: 'full' },
      { name: '私教区', total: 5, available: 3, status: 'normal' }
    ]
  },
  {
    id: 'store_004',
    name: '力健健身(三里屯店)',
    address: '北京市朝阳区三里屯太古里',
    phone: '010-33334444',
    businessHours: '08:00 - 24:00',
    coverImage: 'https://picsum.photos/id/1060/750/400',
    distance: '5.8km',
    isDefault: false,
    equipmentStatus: [
      { name: '跑步机', total: 22, available: 10, status: 'normal' },
      { name: '力量器械', total: 28, available: 12, status: 'busy' },
      { name: '动感单车', total: 18, available: 8, status: 'normal' },
      { name: '游泳池', total: 1, available: 0, status: 'full' }
    ]
  },
  {
    id: 'store_005',
    name: '力健健身(亦庄店)',
    address: '北京市大兴区亦庄经济开发区',
    phone: '010-55556666',
    businessHours: '06:00 - 22:00',
    coverImage: 'https://picsum.photos/id/1058/750/400',
    distance: '15.3km',
    isDefault: false,
    equipmentStatus: [
      { name: '跑步机', total: 18, available: 15, status: 'normal' },
      { name: '力量器械', total: 25, available: 20, status: 'normal' },
      { name: '动感单车', total: 12, available: 10, status: 'normal' },
      { name: '篮球场', total: 2, available: 1, status: 'normal' }
    ]
  }
]
