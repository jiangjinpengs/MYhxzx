// pages/Notice/Notice.js
var Overallsituation = getApp().globalData;
var WxParse = require("../../wxParse/wxParse.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "", //标题
    comtent: "", //内容
    time: "", //发布日期
    id: "", //id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中···',
    })
    wx.request({
      url: Overallsituation.url,
      data: {
        model: "Notice",
        apiname: "Notice"
      },
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        if (res.data.Statecode == 1) {
          this.setData({
            title: res.data.data.title, //标题
            comtent: res.data.data.comtent, //内容
            time: res.data.data.time, //发布日期
            id: res.data.data.id, //id
          })
          console.log(res.data.data.comtent)
          wx.showToast({
            title: 'ok',
            icon: 'none',
            duration: 0
          })
        } else {
          wx.showToast({
            title: '服务器错误,请联系管理员',
            icon: 'none',
            duration: 3000
          })
        }

      },
      fail: function(e) {
        wx.showToast({
          title: '获取资源失败',
          icon: 'none',
          duration: 3000
        })
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

  }
})