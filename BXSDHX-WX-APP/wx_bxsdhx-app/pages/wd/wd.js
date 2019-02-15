// pages/wd/wd.js
var util = require('../../utils/util.js')
var Overallsituation = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: "../../imgs/systemimg/head@2x.png",
      nickName: "12"
    },
    user: {},
    integral: 0,
    progress: "1%",
    stop: "",
    hellow: "none"
  },
  QQ:function(){
    wx.showModal({
      title: '提示',
      content: '复制QQ：1686219806',
      confirmText: "复制QQ",
      cancelText: "知道啦",
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: '1686219806',
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  wx:function(){
    wx.showModal({
      title: '提示',
      content: '复制微信号：18227176063',
      confirmText: "复制微信",
      cancelText: "知道啦",
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: '18227176063',
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中···',
    })
    util.userroot({
      url: "/pages/wd/wd",
      types: 1
    }, data => {
      this.setData({
        userInfo: data.userInfo
      })
      const _this = this;
      util.userroot({
        url: "/pages/sy/sy",
        types: 1
      }, data => {
        if (data.types == 1) {
          util.userdata(function(datas) {
            console.log(datas)
            _this.setData({
              integral: datas.data.money,
              user: datas
            })
            wx.showToast({
              title: '加载成功',
              icon: 'none',
              duration: 0
            })
          })
        }
      })
    })
  },
  Myuserproblem: function() {
    let leoow = this.data.hellow;
    if (leoow == "none") {
      this.setData({
        hellow: "block"
      })
    } else {
      this.setData({
        hellow: "none"
      })
    }
  },
  Release:function(){
    wx.navigateTo({
      url: '/pages/Release/Release',
    })
  },
  singn: function() { //签到
    wx.showLoading({
      title: '签到中...',
    })
    wx.request({
      url: Overallsituation.url, //51后台拿取openid统一接口
      data: {
        wxid: this.data.user.data.wxid, //用户唯一标识符
        model: "hxzxuser", //数据库对象
        apiname: "Signin", //接口门牌
        money: 100
      },
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        if (res.data.Statecode == 0) {
          wx.showToast({
            title: '你今日已经签到啦,明天在来吧',
            icon: 'none',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '签到成功',
            icon: 'success',
            duration: 3000
          })
        }
        this.setData({
          integral: res.data.data.money
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
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