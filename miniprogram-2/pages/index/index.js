// index.js
Page({
  data: {
    src: '/images/icon64_wx_logo.png',
    name: 'Hello world, My friend!'
  },
  getMyInfo: function(e) {
    wx.getUserProfile({
      desc: '完善个人信息',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.userInfo.avatarUrl,
          name: res.userInfo.nickName
        })
      }
    })
  }
})