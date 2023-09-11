// index.js
var common = require('../../utils/common.js')

Page({
  data: {
    //幻灯片素材
    swiperImg: [
      { src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage1.jpg' },
      { src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage2.jpg' },
      { src: 'https://gaopursuit.oss-cn-beijing.aliyuncs.com/2022/newsimage3.jpg' }
    ]
  },
  goToDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  onLoad: function (options) {
    // 获取新闻列表
    let list = common.getNewsList()
    // 更新列表数据
    this.setData({ newsList: list })
  }
})
