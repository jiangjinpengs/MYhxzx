// pages/Myuserproblem/Myuserproblem.js
var Overallsituation = getApp().globalData;
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comtent: [],
    curPage: 1,
    eachPage: 10,
    count: 0,
    maxPage: 0,
    stylego: "none",
    user: {},
    inputtitle: "",
    hasgjasn:""
  },
  comment: function () {
    wx.showToast({
      title: '程序员正努力开发中...',
      icon: 'none',
      duration: 3000
    })
  },
  INPUT: function () {
    if (this.data.inputtitle != "") {
      this.Datapage()
    } else {
      wx.showToast({
        title: '输入错误!',
        icon: 'none',
        duration: 3000
      })
    }
  },
  Givethethumbsup: function (e) {
    wx.showLoading({
      title: '点赞中...',
    })
    let dqdz = e.currentTarget.dataset.item
    let userid = this.data.user.data._id; //用户id
    let list = this.data.comtent;
    // 开始存储
    let cs = {
      _id: userid, //标题
      life: dqdz._id, //内容
      model: "Commonsenseoflife", //数据库对象
      apiname: "Datamanipulation", //接口门牌
      functions: "Parametermodification",
      types: "Givethethumbsup"
    }
    wx.request({
      url: Overallsituation.url,
      data: cs,
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        console.log(res.data)
        for (let i = 0; i < list.length; i++) {
          if (list[i]._id == dqdz._id) {
            if (list[i].Givethethumbsup.color == "red") {
              list[i].Givethethumbsup.color = "#666";
              list[i].Givethethumbsup.user = parseInt(list[i].Givethethumbsup.user) - 1
            } else {
              list[i].Givethethumbsup.color = "red"
              list[i].Givethethumbsup.user = parseInt(list[i].Givethethumbsup.user) + 1
            }
            i = i + list.length
          }
        }
        this.setData({
          comtent: list
        })
        if (res.data.Explain == "取消点赞成功") {
          wx.showToast({
            title: '取消成功!',
            icon: 'none',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '点赞成功!',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '点赞失败,请联系管理员',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  gocomtent: function (e) {
    wx.showLoading({
      title: '加载中...',
    })
    let cs = {
      _id: this.data.user.data._id, //标题
      life: e.currentTarget.dataset.id, //内容
      model: "Commonsenseoflife", //数据库对象
      apiname: "Datamanipulation", //接口门牌
      functions: "Parametermodification",
      types: "Read"
    }
    wx.request({
      url: Overallsituation.url,
      data: cs,
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        console.log(res.data)
        if (res.data.Statecode == 1) {
          console.log("阅读计算成功")
          let index = e.currentTarget.dataset.item;
          // this.Datapage(index)
          let list = this.data.comtent;
          if (list[index].trdom == 90) {
            for (let i = 0; i < list.length; i++) {
              list[i] = {
                title: list[i].title,
                _id: list[i]._id,
                comtent: list[i].comtent,
                time: list[i].time, //发布日期
                name: list[i].name, //谁发布的
                Readingvolume: list[i].Readingvolume, //阅读记录 阅读量 阅读用户
                Givethethumbsup: list[i].Givethethumbsup, //点赞量
                comment: list[i].comment, //评论
                height: "0rpx",
                trdom: 0
              }
            }
          } else {
            for (let i = 0; i < list.length; i++) {
              list[i] = {
                title: list[i].title,
                comtent: list[i].comtent,
                _id: list[i]._id,
                time: list[i].time, //发布日期
                name: list[i].name, //谁发布的
                Readingvolume: list[i].Readingvolume, //阅读记录 阅读量 阅读用户
                Givethethumbsup: list[i].Givethethumbsup, //点赞量
                comment: list[i].comment, //评论
                height: "0rpx",
                trdom: 0
              }
            }
            list[index] = {
              title: list[index].title,
              comtent: list[index].comtent,
              _id: list[index]._id,
              time: list[index].time, //发布日期
              name: list[index].name, //谁发布的
              Readingvolume: list[index].Readingvolume, //阅读记录 阅读量 阅读用户
              Givethethumbsup: list[index].Givethethumbsup, //点赞量
              comment: list[index].comment, //评论
              height: "100%",
              trdom: 90
            }
          }
          this.setData({
            comtent: list
          })
          wx.showToast({
            title: '加载成功',
            icon: 'none',
            duration: 0
          })
        } else {
          wx.showToast({
            title: '打开失败,请联系管理员',
            icon: 'none',
            duration: 3000
          })
        }

      },
      fail: function (e) {
        wx.showToast({
          title: '打开失败,请联系管理员',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  inputtitle: function (e) {
    this.setData({
      inputtitle: e.detail.value,
      stylego: "none"
    })
  },
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中···',
    })
    util.userroot({
      url: "/pages/Myuserproblem/Myuserproblem",
      types: 1
    }, data => {
      if (data.types == 1) {
        util.userdata(function (datas) {
          _this.setData({
            user: datas
          })
          wx.showToast({
            title: '加载成功!',
            icon: 'none',
            duration: 0
          })
        })
      }
    })
  },
  Datapage(index) { //数据更新
    let id = this.data.user.data._id;
    wx.showLoading({
      title: '加载中···',
    })
    wx.request({
      url: Overallsituation.url, //51后台拿取openid统一接口
      data: {
        model: "Commonsenseoflife", //数据库对象
        apiname: "datalist", //接口门牌
        curPage: this.data.curPage,
        eachPage: this.data.eachPage,
        title: this.data.inputtitle
      },
      header: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: res => {
        console.log(res.data)
        if (res.data.Statecode == 0) {
          wx.showToast({
            title: '服务器异常,请联系管理员',
            icon: 'none',
            duration: 3000
          })
        } else {
          this.setData({
            comtent: hellow(res.data.data.rows.rows),
            curPage: res.data.data.curPage,
            eachPage: res.data.data.eachPage,
            count: res.data.data.count,
            maxPage: res.data.data.maxPage,
            Degreeofheat: res.data.data.rows.Degreeofheat
          })
          console.log(res.data.data.rows.rows.length)
          if (res.data.data.rows.rows.length <= 0) {
            wx.showToast({
              title: '暂无数据,换个关键词呗',
              icon: 'none',
              duration: 4000
            })
            this.setData({
              stylego: "none",
              hasgjasn:"暂无数据,换个关键词呗"
            })
          } else {
            this.setData({
              stylego: "block",
              hasgjasn:""
            })
          }
          wx.showToast({
            title: '加载成功!',
            icon: 'none',
            duration: 1
          })

          function hellow(list) {
            let datas = [];
            for (let i = 0; i < list.length; i++) {
              datas.push({
                title: list[i].title.length > 19 ? list[i].title.substring(0, 18) + "..." : list[i].title, //标题
                comtent: list[i].comtent, //内容
                time: list[i].time, //发布日期
                name: user(list[i].name), //谁发布的
                Readingvolume: Readingvolume(list[i].Readingvolume), //阅读记录 阅读量 阅读用户
                Givethethumbsup: Givethethumbsup(list[i].Givethethumbsup), //点赞量
                comment: list[i].comment, //评论
                height: "0px",
                trdom: 0,
                _id: list[i]._id,
              })
            }

            function Givethethumbsup(list) {
              let user = [];
              let hellow = "no"
              for (let i = 0; i < list.length; i++) {
                if (list[i]._id == id) {
                  hellow = i
                } else {
                  hellow = "no"
                }
              }
              let csfh
              if (hellow == "no") {
                csfh = {
                  color: "#666",
                  user: list.length
                }
              } else {
                csfh = {
                  color: "red",
                  user: list.length
                }
              }
              return csfh
            }

            function Readingvolume(list) { //阅读量
              let index = 0;
              for (let i = 0; i < list.length; i++) {
                for (let n = 0; n < list[i].arr.length; n++) {
                  index++
                }
              }
              return index
            }

            function user(data) { //作者
              let datas;
              if (data._id == "pc-and-phome") {
                datas = {
                  wxname: data.wxname,
                  img: "../../imgs/usersystem.png",
                  _id: data._id
                }
              } else {
                if (data.img == "ht") {
                  datas = {
                    wxname: data.wxname,
                    img: "../../imgs/usersystem.png",
                    _id: data._id
                  }
                } else {
                  datas = data
                }
              }
              return datas
            }
            return datas
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (parseInt(this.data.eachPage) <= this.data.count) {
      this.setData({
        eachPage: parseInt(this.data.eachPage) + 10
      })
      this.Datapage()
    } else {
      wx.showToast({
        title: '木有数据啦',
        icon: 'none',
        duration: 3000
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "有人@我！来,见识一下什么叫生活",
      imageUrl: "../../imgs/u=1377871528,2929942042&fm=27&gp=0.jpg",
      success: function (t) {
        console.log("转发成功!!!");
      },
      fail: function (t) {
        console.log("转发失败!!!");
      }
    };
  }
})