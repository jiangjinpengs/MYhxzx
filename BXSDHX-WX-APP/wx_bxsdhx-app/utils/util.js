var Overallsituation = getApp().globalData;

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const userroot = (data, callback) => {
  wx.getUserInfo({
    success: res => {
      console.log("用户已授权")
      callback({
        types: 1,
        userInfo: res.userInfo
      })
    },
    fail: res => {
      wx.redirectTo({
        url: `/pages/login/login?url=${data.url}&types=${data.types}`,
      })
      console.log("用户未授权")
    }
  })
}

const userdata = (callback) => {
  var _this = this;
  //插入登录的用户的相关信息到数据库
  wx.getNetworkType({
    success: function(res) {
      if (res.networkType != "none") {
        wx.getUserInfo({
          success: function(res) {
            const userl = res.userInfo;
            wx.login({
              //获取code
              success: res => {
                wx.request({
                  url: "https://weixin.uurtb.com/user/wx_gotid", //51后台拿取openid统一接口
                  data: {
                    codo: res.code, //返回code
                    types: "f51",
                    appid: "wx30143aca22cd4b26",
                    secret: "157022ef362d76a843fa0452ec65fdc4"
                  },
                  header: {
                    "content-Type": "application/x-www-form-urlencoded"
                  },
                  method: "POST",
                  success: res => {
                    const userdataw = {
                      wxid: res.data.openid, //用户唯一标识符
                      wxname: userl.nickName, //姓名
                      gender: userl.gender, //性别
                      img: userl.avatarUrl, //头像
                      model: "hxzxuser", //数据库对象
                      apiname: "WeChatuserlogin", //接口门牌
                      types: "woyaoyongzhgegeasndja",
                    }
                    wx.request({
                      url: Overallsituation.url, //51后台拿取openid统一接口
                      data: userdataw,
                      header: {
                        "content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "POST",
                      success: res => {
                        callback(res.data)
                      }
                    })
                  }
                })
              }
            })
          }
        });
      } else {
        wx.showToast({
          title: '手机没有开启网络喔',
          icon: 'none',
          duration: 3000
        })
      }
    }
  })
}

module.exports = {
  userroot: userroot,
  userdata: userdata,
  formatTime: formatTime
}