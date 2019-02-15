// pages/gamelist/gamelist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    game: {
      author: [1],
      Thirdparty: []
    }
  },
  gocb: function() {
    wx.navigateTo({
      url: `/pages/PressChibi/PressChibi`
    })
  },
  Lately: function(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _this = this;
    wx.request({
      url: 'https://weixin.uurtb.com/game/query',
      data: {
        curPage: 1,
        eachPage: 10,
        Scopeofthegenus: "Displayall",
        Gametype: "Displayall", //是否处于搜索阶段
      },
      header: {
        "content-Type": "application/json"
      },
      method: "POST",
      success: function(res) {
        let list = res.data.rows;
        let games = [];
        for (let i = 0; i < list.length; i++) {
          games.push({
            GameUrl: list[i].GameUrl, //游戏id
            path: list[i].path == '无' ? '' : list[i].path, //游戏path
            Gamepicture: `https://weixin.uurtb.com${list[i].Gamepicture[0].url}`, //游戏图片
            Gamename: list[i].Gamename.length > 5 ? list[i].Gamename.substring(0, 4) + ".." : list[i].Gamename, //游戏名字
            GameDescription: list[i].GameDescription.length > 20 ? list[i].GameDescription.substring(0, 19) + ".." : list[i].GameDescription, //游戏说明
            Inthenumberofpeopleplaying: list[i].Inthenumberofpeopleplaying
          })
        }
        _this.setData({
          game: {
            author: [1],
            Thirdparty: games
          }
        })
      },
      fail: e => {
        if (e.errMsg != "request:fail ") {} else {
          wx.showToast({
            title: '通信异常1',
            icon: 'none',
            duration: 3000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "有人@我！来,见识一下什么叫生活",
      imageUrl: "../../imgs/u=1377871528,2929942042&fm=27&gp=0.jpg",
      success: function(t) {
        console.log("转发成功!!!");
      },
      fail: function(t) {
        console.log("转发失败!!!");
      }
    };
  }
})