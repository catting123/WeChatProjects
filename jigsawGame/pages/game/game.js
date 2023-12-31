// pages/game/game.js
// 方块的初始位置
var num = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22']
]

// 方块的宽度
var w = 100

// 图片的初始地址
var url = '/images/pic01.jpg'

Page({
  /**
   * 页面初始数据
   */
  data: {
    isWin: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    url = '/images/' + options.level
    this.setData({ url: url })
    this.ctx = wx.createCanvasContext('myCanvas')
    this.shuffle()
    this.drawCanvas()
  },
  /**
   * 自定义函数--随机打乱方块顺序
   */
  shuffle: function () {
    // 先令所有方块回归初始位置
    num = [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22']
    ]
    // 记录当前空白方块的行和列
    var row = 2
    var col = 2
    // 随机打乱方块顺序100次
    for (var i = 0; i < 100; i++) {
      // 随机生成一个方向：上0，下1，左2，右3
      var direction = Math.floor(Math.random() * 4)
      if (direction == 0) { // 上0
        if (row != 0) {
          num[row][col] = num[row - 1][col]
          num[row - 1][col] = '22'
          row -= 1
        }
      } else if (direction == 1) { // 下1
        if (row != 2) {
          num[row][col] = num[row + 1][col]
          num[row + 1][col] = '22'
          row += 1
        }
      }
      else if (direction == 2) { // 左2
        if (col != 0) {
          num[row][col] = num[row][col - 1]
          num[row][col - 1] = '22'
          col -= 1
        }
      } else if (direction == 3) { // 右3
        if (col != 2) {
          num[row][col] = num[row][col + 1]
          num[row][col + 1] = '22'
          col += 1
        }
      }
    }
  },
  /**
   * 自定义函数--绘制画布内容
   */
  drawCanvas: function () {
    let ctx = this.ctx
    // 清空画布
    ctx.clearRect(0, 0, 300, 300)
    // 使用双重for循环绘制3×3的拼图
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (num[i][j] != '22') {
          // 获取行和列
          var row = parseInt(num[i][j] / 10)
          var col = num[i][j] % 10
          // 绘制方块
          ctx.drawImage(url, col * w, row * w, w, w, j * w, i * w, w, w)
        }
      }
    }
    ctx.draw()
  },
  /**
   * 自定义函数--判断游戏是否成功
   */
  isWin: function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (num[i][j] != i * 10 + j) {
          return false
        }
      }
    }
    this.setData({ isWin: true })
    return true
  },
  /**
   * 自定义函数--监听点击方块事件
   */
  touchBox: function (e) {
    // 如果游戏已经成功，不做任何操作
    if (this.data.isWin) {
      return
    }
    // 获取被点击方块的坐标x和y
    var x = e.changedTouches[0].x
    var y = e.changedTouches[0].y
    console.log('x: ' + x + 'y: ' + y)
    // 换算成行和列
    var row = parseInt(y / w)
    var col = parseInt(x / w)
    // 如果点击的不是空白位置
    if (num[row][col] != '22') {
      // 尝试移动方块
      this.moveBox(row, col)
      // 重新绘制画布内容
      this.drawCanvas()
      // 判断游戏是否成功
      if (this.isWin()) {
        // 在画面上绘制提示语句
        let ctx = this.ctx
        // 绘制完整图片
        ctx.drawImage(url, 0, 0)
        // 绘制文字
        ctx.setFillStyle('#e64340')
        ctx.setTextAlign('center')
        ctx.setFontSize(60)
        ctx.fillText('游戏成功', 150, 150)
        ctx.draw()
      }
    }
  },
  /**
   * 自定义函数--移动被点击的方块
   */
  moveBox: function (i, j) {
    // case 1: 如果被点击的方块不在最上方，检查是否能上移
    if (i > 0) {
      if (num[i - 1][j] == '22') {
        num[i - 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    // case 2: 如果被点击的方块不在最下方，检查是否能下移
    if (i < 2) {
      if (num[i + 1][j] == '22') {
        num[i + 1][j] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    // case 3: 如果被点击的方块不在最左边，检查是否能左移
    if (j > 0) {
      if (num[i][j - 1] == '22') {
        num[i][j - 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
    // case 4: 如果被点击的方块不在最右边，检查是否能右移
    if (j < 2) {
      if (num[i][j + 1] == '22') {
        num[i][j + 1] = num[i][j]
        num[i][j] = '22'
        return
      }
    }
  },
  /**
   * 自定义函数--重新开始游戏
   */
  restartGame: function() {
    this.setData({isWin:false})
    this.shuffle()
    this.drawCanvas()
  }
})