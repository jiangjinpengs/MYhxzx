// pages/Myuserproblem/Myuserproblem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comtent: [{
      title: "指甲油涂完后把指甲浸泡在冷水中,会干的很快速。",
      comtent: "指甲油涂完后把指甲浸泡在冷水中,会干的很快速。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "鼻头上的黑头粉刺很不雅观,用手去挤又常会留下痕迹,其实可以在洗完脸后,用手指沾些细盐在鼻头两侧轻轻摩擦,然后再用清水冲净,黑头粉刺就会清除干净,毛细孔也会变小。",
      comtent: "鼻头上的黑头粉刺很不雅观,用手去挤又常会留下痕迹,其实可以在洗完脸后,用手指沾些细盐在鼻头两侧轻轻摩擦,然后再用清水冲净,黑头粉刺就会清除干净,毛细孔也会变小。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "乘公交车，侧着站更稳。",
      comtent: "乘公交车，侧着站更稳。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "睡觉的时候,鼻子塞住,很难受,在脸上盖一块小手绢(轻薄的就可以),过会儿鼻子就通气了。",
      comtent: "睡觉的时候,鼻子塞住,很难受,在脸上盖一块小手绢(轻薄的就可以),过会儿鼻子就通气了。  ",
      height: "0rpx",
      trdom: 0
    }, {
      title: "用吸管喝饮料，防蛀牙。",
      comtent: "用吸管喝饮料，防蛀牙。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "背上的豆豆,用浴盐或者上海硫磺皂,坚持一段时间就下去了",
      comtent: "背上的豆豆,用浴盐或者上海硫磺皂,坚持一段时间就下去了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "治鼻炎的偏方,用盐水冲刷鼻腔。",
      comtent: "治鼻炎的偏方,用盐水冲刷鼻腔。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "维生素E涂睫毛,睫毛会变得又粗又长",
      comtent: "维生素E涂睫毛,睫毛会变得又粗又长",
      height: "0rpx",
      trdom: 0
    }, {
      title: "家里很多杯子上都有茶渍,可以用牙膏刷,抹在茶渍上,一刷就下来啦。",
      comtent: "家里很多杯子上都有茶渍,可以用牙膏刷,抹在茶渍上,一刷就下来啦。 ",
      height: "0rpx",
      trdom: 0
    }, {
      title: "如果衣物上不小心滴上了油,在洗衣服之前,保持衣服是干的,然后在滴油的地方滴上洗洁精,再搓两下,洗的话就不会有油印子了",
      comtent: "如果衣物上不小心滴上了油,在洗衣服之前,保持衣服是干的,然后在滴油的地方滴上洗洁精,再搓两下,洗的话就不会有油印子了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "有沙子或异物进眼睛的时候,立即吐口水,吐多点,然后不停地眨眼睛,百试百灵的。",
      comtent: "有沙子或异物进眼睛的时候,立即吐口水,吐多点,然后不停地眨眼睛,百试百灵的。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "吃过于肥腻的食物后喝茶，能刺激自律神经，促进脂肪代谢。",
      comtent: "吃过于肥腻的食物后喝茶，能刺激自律神经，促进脂肪代谢。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "咖啡伴侣比薯片更致胖。",
      comtent: "咖啡伴侣比薯片更致胖。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "只要在珠宝盒中放上一节小小的粉笔，即可让首饰常保光泽。",
      comtent: "只要在珠宝盒中放上一节小小的粉笔，即可让首饰常保光泽。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "吃了有异味的东西，如大蒜、臭豆腐，吃几颗花生米就好了",
      comtent: "吃了有异味的东西，如大蒜、臭豆腐，吃几颗花生米就好了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "旅行带衣服时如果怕压起褶皱，可以把每件衣服都卷成卷。",
      comtent: "旅行带衣服时如果怕压起褶皱，可以把每件衣服都卷成卷。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "如果嗓子、牙龈发炎了，在晚上把西瓜切成小块，沾着盐吃，记得一定要是晚上，当时症状就会减轻，第二天就好了",
      comtent: "如果嗓子、牙龈发炎了，在晚上把西瓜切成小块，沾着盐吃，记得一定要是晚上，当时症状就会减轻，第二天就好了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "刚刚被蚊子咬完时，涂上肥皂就不会痒了",
      comtent: "刚刚被蚊子咬完时，涂上肥皂就不会痒了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "嘴里有溃疡，就用维生素C贴在溃疡处，等它溶化后溃疡基本就好了",
      comtent: "嘴里有溃疡，就用维生素C贴在溃疡处，等它溶化后溃疡基本就好了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "若有小面积皮肤损伤或者烧伤、烫伤，抹上少许牙膏，可立即止血止痛。",
      comtent: "若有小面积皮肤损伤或者烧伤、烫伤，抹上少许牙膏，可立即止血止痛。",
      height: "0rpx",
      trdom: 0
    }, {
      title: "牙齿黄，可以把花生嚼碎后含在嘴里，并刷牙三分钟，很有效",
      comtent: "牙齿黄，可以把花生嚼碎后含在嘴里，并刷牙三分钟，很有效",
      height: "0rpx",
      trdom: 0
    }, {
      title: "吃了辣的东西，感觉就要被辣死了，就往嘴里放上少许盐，含一下，吐掉，漱下口，就不辣了",
      comtent: "吃了辣的东西，感觉就要被辣死了，就往嘴里放上少许盐，含一下，吐掉，漱下口，就不辣了",
      height: "0rpx",
      trdom: 0
    }, {
      title: "画眼线的小技巧:要画好一双细致的眼线，可以先把手肘固定在桌上，然后平放一块小镜子，让双眼朝下望向镜子，就可以放心描画眼线了。",
      comtent: "画眼线的小技巧:要画好一双细致的眼线，可以先把手肘固定在桌上，然后平放一块小镜子，让双眼朝下望向镜子，就可以放心描画眼线了。 ",
      height: "0rpx",
      trdom: 0
    }, {
      title: "化妆时，先把微湿的化妆绵放到冰箱里，几分钟后把冰凉的海绵拍在抹好粉底的肌肤上，你会觉得肌肤格外清爽，彩妆也显得特别清新",
      comtent: "化妆时，先把微湿的化妆绵放到冰箱里，几分钟后把冰凉的海绵拍在抹好粉底的肌肤上，你会觉得肌肤格外清爽，彩妆也显得特别清新",
      height: "0rpx",
      trdom: 0
    }, ]
  },
  gocomtent: function(e) {
    let index = e.currentTarget.dataset.item;
    let list = this.data.comtent;
    if (list[index].trdom == 90) {
      for (let i = 0; i < list.length; i++) {
        list[i] = {
          title: list[i].title,
          comtent: list[i].comtent,
          height: "0rpx",
          trdom: 0
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        list[i] = {
          title: list[i].title,
          comtent: list[i].comtent,
          height: "0rpx",
          trdom: 0
        }
      }
      list[index] = {
        title: list[index].title,
        comtent: list[index].comtent,
        height: "100%",
        trdom: 90
      }
    }
    this.setData({
      comtent: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let list = this.data.comtent;
    for (let i = 0; i < list.length; i++) {
      list[i].title = list[i].title.length > 6 ? list[i].title.substring(0, 5) + "..." : list[i].title
    }
    this.setData({
      comtent: list
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
      title: "有人@我！免费兑换凤求凰，地狱火...",
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