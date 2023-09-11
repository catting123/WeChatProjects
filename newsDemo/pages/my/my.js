// pages/my/my.js
Page({
  data: {
    num: 0
  },
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: (res) => {
        let info = res.userInfo
        this.setData({
          isLogin: true,
          src: info.avatarUrl,
          nickName: info.nickName
        })
        this.getMyFavorites();
      }
    })
  },
  getMyFavorites: function () {
    let info = wx.getStorageInfoSync(); // 读取本地缓存信息
    let keys = info.keys; // 获取全部key信息
    let num = keys.length; // 获取收藏新闻数量
    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageInfoSync(keys[i]);
      myList.push(obj); // 将新闻添加到数组中
    }
    // 更新收藏列表
    this.setData({
      newsList: myList,
      num: num
    })
  },
  onShow: function () {
    // 如果已经登录
    if (this.data.isLogin) {
      // 更新收藏列表
      this.getMyFavorites()
    }
  },
  goToDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  }
})