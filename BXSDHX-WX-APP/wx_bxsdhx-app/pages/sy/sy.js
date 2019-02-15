// pages/sy/sy.js
const {
  url
} = getApp().globalData;
var util = require('../../utils/util.js')
var Overallsituation = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    xinwen: [],
    Rankings: {},
    Rankingsno: "none",
    curPage: 1,
    eachPage: 10,
    count: 0,
    maxPage: 0,
  },
  nosadsas: function() {
    wx.showToast({
      title: '程序员正努力开发中',
      icon: 'none',
      duration: 2000
    })
  },
  Notice: function() {
    wx.navigateTo({
      url: `/pages/Notice/Notice`
    })
  },
  resources: function () {
    wx.navigateTo({
      url: `/pages/resources/resources`
    })
  },
  gamelist:function(){
    wx.navigateTo({
      url: `/pages/gamelist/gamelist`
    })
  },
  Rankingsnos: function() {
    this.setData({
      Rankingsno: "none"
    })
  },
  lower: function() {
    if (parseInt(this.data.eachPage) <= this.data.count) {
      this.setData({
        eachPage: parseInt(this.data.eachPage) + 10
      })
      this.Rankings()
    } else {
      wx.showToast({
        title: '木有数据啦',
        icon: 'none',
        duration: 3000
      })
    }
  },
  Rankings: function() {
    //全服排名
    wx.showLoading({
      title: '加载中···',
    })
    wx.request({
      url: Overallsituation.url,
      data: {
        model: "hxzxuser", //数据库对象
        apiname: "datalist", //接口门牌
        curPage: this.data.curPage,
        eachPage: this.data.eachPage,
        _id: this.data.user.data._id
      },
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        console.log(res.data)
        if (res.data.Statecode == 1) {
          this.setData({
            Rankings: res.data.data.rows,
            Rankingsno: "block",
            curPage: res.data.data.curPage,
            eachPage: res.data.data.eachPage,
            count: res.data.data.count,
            maxPage: res.data.data.maxPage,
          })
          wx.showToast({
            title: '加载成功!',
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
  xinwenssss: function(e) {
    let xinwen = e.currentTarget.dataset.item;
    wx.showModal({
      title: '提示',
      content: '复制链接到浏览器打开新闻详情',
      confirmText: "复制链接",
      cancelText: "暂时不用",
      success: function(res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: xinwen.url,
            success: function(res) {
              wx.getClipboardData({
                success: function(res) {
                  console.log(res.data) // data
                }
              })
            }
          })
        } else if (res.cancel) {}
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中···',
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
            user: datas
          })
          _this.xinwen()
          wx.showToast({
            title: 'ok',
            icon: 'none',
            duration: 0
          })
        })
      }
    })
  },
  xinwen: function() {
    wx.getStorage({
      key: 'xinwen',
      success: res => {
        this.setData({
          xinwen: res.data
        })
        console.log("本地数据")
        wx.showToast({
          title: 'ok',
          icon: 'none',
          duration: 0
        })
      },
      fail: res => {
        console.log("服务端数据")
        wx.request({
          url: Overallsituation.url,
          data: {
            model: "Newsinterface",
          },
          header: {
            "content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: res => {
            console.log(res)
            if (res.data.Statecode == 1) {
              if (res.data.data.result != null) {
                this.setData({
                  xinwen: res.data.data.result.data
                })
                wx.setStorageSync("xinwen", res.data.data.result.data)
              }
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