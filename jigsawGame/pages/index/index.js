// index.js

Page({
  /**
 * 页面的初始数据
 */
  data: {
    levels: [
      'pic01.jpg',
      'pic02.jpg',
      'pic03.jpg',
      'pic04.jpg',
      'pic05.jpg',
      'pic06.jpg'
    ]
  },
  /**
   * 自定义函数--游戏选关
   */
  chooseLevel: function (e) {
    let level = e.currentTarget.dataset.level
    wx.navigateTo({
      url: '../game/game?level=' + level,
    })
  }
})
