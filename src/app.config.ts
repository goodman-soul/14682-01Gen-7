export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/courses/index',
    'pages/coaches/index',
    'pages/mine/index',
    'pages/store-select/index',
    'pages/course-detail/index',
    'pages/coach-detail/index',
    'pages/wallet/index',
    'pages/entry-code/index',
    'pages/booking-list/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FF6B35',
    navigationBarTitleText: '健身会员',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#FF6B35',
    backgroundColor: '#FFFFFF',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/courses/index',
        text: '课程'
      },
      {
        pagePath: 'pages/coaches/index',
        text: '私教'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
