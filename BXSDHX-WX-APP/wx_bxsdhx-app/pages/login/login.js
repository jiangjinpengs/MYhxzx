// pages/login/login.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: !1,
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    url: "",
    types: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      url: options.url,
      types: options.types,
    })
    const _this = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      //授权成功后，跳转进入小程序首页
      _this.url(_this.data.url, _this.data.types)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          _this.url(_this.data.url, _this.data.types)
        }
      })
    }
  },
  bindGetUserInfo: function(e) {
    const _this = this
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.getUserInfo({
        success: function(res) {
          //授权成功后，跳转进入小程序首页
          app.globalData.userInfo = res.userInfo;
          _this.url(_this.data.url, _this.data.types)
          wx.showToast({
            title: '微信授权成功!',
            icon: 'none',
            duration: 2000
          })
        }
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权后再进入',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  url: function(url, types) {
    //0非tab1是tab
    if (types == "0") {
      wx.redirectTo({
        url: url,
      })
    } else {
      wx.switchTab({
        url: url,
      })
    }
  }
})