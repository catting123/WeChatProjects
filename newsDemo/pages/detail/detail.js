// pages/detail/detail.js
var common = require('../../utils/common.js')

Page({
  data: {
    isAdd: false
  },
  // 自定义函数——用户是否登录
  onLoad: function (options) {
    // 获取页面跳转来时携带的数据
    let id = options.id
    // 检查当前新闻是否在收藏夹中
    let artcile = wx.getStorageSync(id)
    // 如果新闻已存在
    if (artcile != '') {
      // 直接更新新闻数据
      this.setData({
        article: artcile,
        isAdd: true
      })
    }
    // 如果新闻不存在
    else {
      let result = common.getNewsDetail(id)
      // 获取到新闻内容
      if (result.code == '200') {
        this.setData({
          article: result.news,
          isAdd: false
        })
      }
    }
  },
  // 添加到收藏夹
  addFavorites: function (options) {
    let article = this.data.article
    wx.setStorageSync(article.id, article)
    this.setData({
      isAdd: true
    })
  },
  // 取消收藏
  cancelFavorites: function () {
    let article = this.data.article
    wx.removeStorageSync(article.id);
    this.setData({
      isAdd: false
    })
  }
})