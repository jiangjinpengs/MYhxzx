// pages/PressChibi/PressChibi.js
var Overallsituation = getApp().globalData;
var util = require('../../utils/util.js');
let branch = "",
  second = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    over: [],
    curPage: 1,
    eachPage: 10,
    count: 0,
    maxPage: 0,
    over1: [],
    curPage1: 1,
    eachPage1: 10,
    count1: 0,
    maxPage1: 0,
    tiems: "00：00",
    time: "",
    mark: "0rpx",
    inputtitle: "",
    user: {},
    participatein: 0,
    Success: 0,
    participateinmoney: 0,
    Harvest: 0,
    usertz: {
      ob: "暂无押注",
      my: 0
    },
    stylejilu: "none"
  },
  mark: function() {
    if (this.data.mark == "100%") {
      this.setData({
        mark: "0rpx"
      })
    } else {
      this.setData({
        mark: "100%"
      })
    }
  },
  inputtitle: function(e) {
    this.setData({
      inputtitle: parseInt(e.detail.value)
    })
  },
  Choice: function(e) {
    if (this.data.usertz.ob == "暂无押注") {
      let hellow = {
        ob: e.currentTarget.dataset.index,
        my: 0
      }
      this.setData({
        usertz: hellow
      })
    } else {
      wx.showToast({
        title: '本期你已选择国家,下期再来吧',
        icon: 'none',
        duration: 3000
      })
    }
  },
  Release: function() {
    if (this.data.usertz.ob != "暂无押注") {
      if (this.data.inputtitle != "") {
        if (parseInt(this.data.inputtitle) <= parseInt(this.data.user.money)) {
          if (this.data.usertz.my == 0) {
            wx.showLoading({
              title: '押注中...',
            })
            let hellow = {
              ob: this.data.usertz.ob,
              my: parseInt(this.data.inputtitle)
            }
            let hellowuser = this.data.user;
            hellowuser.money = parseInt(hellowuser.money) - parseInt(this.data.inputtitle);
            //保存完善。
            let sjs = Math.floor(Math.random() * 3 + 1);
            let listcb = ["魏", "蜀", "吴"];
            let dfghj = {
              _id: this.data.user._id, //用户id
              objests: listcb[sjs - 1], //官方结果
              model: "PressChibi", //数据库对象
              apiname: "Datamanipulation", //接口门牌
              money: this.data.inputtitle,
              over: this.data.usertz.ob
            }
            wx.request({
              url: Overallsituation.url,
              data: dfghj,
              header: {
                "content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: res => {
                console.log(res.data)
                this.setData({
                  usertz: hellow,
                  inputtitle: "",
                  user: hellowuser //更新积分
                })
                wx.showToast({
                  title: '押注成功,请等待结果',
                  icon: 'none',
                  duration: 3000
                })
              },
              fail: function(e) {
                wx.showToast({
                  title: '投注失败,请联系管理员',
                  icon: 'none',
                  duration: 3000
                })
              }
            })
          } else {
            wx.showToast({
              title: '本期你已投注,下期再来吧',
              icon: 'none',
              duration: 3000
            })
          }
        } else {
          wx.showToast({
            title: '你木有那么多积分',
            icon: 'none',
            duration: 3000
          })
        }
      } else {
        wx.showToast({
          title: '输入错误',
          icon: 'none',
          duration: 3000
        })
      }
    } else {
      wx.showToast({
        title: '请选择你要押注的国家',
        icon: 'none',
        duration: 3000
      })
    }
  },
  stylejilu: function() {
    if (this.data.stylejilu == "none") {
      this.setData({
        stylejilu: "block"
      })
      //加载新数据
      this.Datapage1()
    } else {
      this.setData({
        stylejilu: "none"
      })
    }
  },
  Datapage1() { //数据更新
    const _this = this;
    wx.showLoading({
      title: '加载中···',
    })
    wx.request({
      url: Overallsituation.url, //51后台拿取openid统一接口
      data: {
        model: "PressChibi", //数据库对象
        apiname: "datalist", //接口门牌
        curPage: _this.data.curPage1,
        eachPage: _this.data.eachPage1,
        id: _this.data.user._id,
        types: ""
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
          _this.setData({
            over1: list(res.data.data.rows),
            curPage1: res.data.data.curPage,
            eachPage1: res.data.data.eachPage,
            count1: res.data.data.count,
            maxPage1: res.data.data.maxPage,
          })

          function list(list) {
            let you = [];
            for (let i = 0; i < list.length; i++) {
              you.push({
                go: list[i].go,
                id: list[i].id,
                objests: list[i].objests,
                ifmoney: list[i].ifmoney,
                over: list[i].over,
                index: parseInt(list[i].index) + 1,
                time: list[i].time,
              })

            }
            return you
          }
          wx.showToast({
            title: '加载成功!',
            icon: 'none',
            duration: 0
          })
        }
      }
    })
  },
  time: function() {
    this.data.time = setInterval(res => {
      let time1 = util.formatTime(new Date());
      time1 = time1.split(" ")[1].split(":");
      branch = 1 - (parseInt(time1[1]) - (Math.floor(parseInt(time1[1]) / 2) * 2));
      second = 60 - parseInt(time1[2]);
      time1 = `${branch} : ${second}`;
      this.setData({
        tiems: time1
      })
      if (branch == 0 && second == 1) {
        console.log("这里结束一期")
        this.setData({
          tiems: "本期结束,刷新继续"
        })
        //产生最终结果
        clearTimeout(this.data.time)
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.time()
    wx.showLoading({
      title: '加载中···',
    })
    const _this = this;
    util.userroot({
      url: "/pages/PressChibi/PressChibi",
      types: 1
    }, data => {
      if (data.types == 1) {
        util.userdata(function(datas) {
          _this.setData({
            user: datas.data
          })
          _this.Datapage()
        })
      }
    })
  },
  Datapage() { //数据更新
    const _this = this;
    wx.showLoading({
      title: '加载中···',
    })
    wx.request({
      url: Overallsituation.url, //51后台拿取openid统一接口
      data: {
        model: "PressChibi", //数据库对象
        apiname: "datalist", //接口门牌
        curPage: _this.data.curPage,
        eachPage: _this.data.eachPage,
        id: _this.data.user._id,
        types: "qj"
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
          _this.setData({
            over: list(res.data.data.rows.rows),
            curPage: res.data.data.curPage,
            eachPage: res.data.data.eachPage,
            count: res.data.data.count,
            maxPage: res.data.data.maxPage,
            participatein: res.data.data.rows.participatein,
            Success: res.data.data.rows.Success,
            participateinmoney: res.data.data.rows.participateinmoney,
            Harvest: res.data.data.rows.Harvest
          })

          function list(list) {
            let id = _this.data.user._id;
            let you = [];
            for (let i = 0; i < list.length; i++) {
              if (id == list[i].id) {
                you.push({
                  go: list[i].go,
                  id: list[i].id,
                  objests: list[i].objests,
                  ifmoney: list[i].ifmoney,
                  over: list[i].over,
                  index: parseInt(list[i].index) + 1,
                  time: list[i].time,
                })
              } else {
                you.push({
                  go: 0,
                  id: list[i].id,
                  ifmoney: 0,
                  objests: "未下注",
                  over: list[i].over,
                  index: parseInt(list[i].index) + 1,
                  time: list[i].time,
                })
              }
            }
            return you
          }
          wx.showToast({
            title: '加载成功!',
            icon: 'none',
            duration: 0
          })
        }
      }
    })
  },
  lower1: function() {
    //翻页
    if (parseInt(this.data.eachPage1) <= this.data.count1) {
      this.setData({
        eachPage1: parseInt(this.data.eachPage1) + 10
      })
      this.Datapage1()
    } else {
      wx.showToast({
        title: '木有数据啦',
        icon: 'none',
        duration: 3000
      })
    }
  },
  lower: function() {
    //翻页
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
    clearTimeout(this.data.time)
    if (this.data.tiems == "本期结束,刷新继续") {
      this.setData({
        usertz: {
          ob: "暂无押注",
          my: 0
        },
      })
    }
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