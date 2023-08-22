// index.js
const util = require('../../utils/util.js')

Page({
  data:{
    region:['山东省', '青岛市', '崂山区'],
    now:{
      temp:'0',
      text:'未知',
      icon:'999',
      humidity:'0',
      pressure:'0',
      vis:'0',
      windDir:'0',
      windSpeed:'0',
      windScale:'0'
    },
    image_src:'/images/weather_icon_s2/999.png'
  },
  regionChange: function(e) {
    this.setData({region: e.detail.value});
    this.getWeather();
  },
  onLoad: function(e) {
    this.getWeather();
  },
  getWeather: function(e) {
    var that=this;
    wx.request({
      url: 'https://devapi.qweather.com/v7/weather/now',
      data:{
        location: util.getLocationID(that.data.region[2]),
        key: '6942a1b82c6b4d5899c2d3fb82f8e967',
      },
      success: function(res) {
        that.setData({now:res.data.now})
      }
    })
  }
})
