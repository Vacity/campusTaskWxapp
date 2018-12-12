// pages/release/release.js
const app = getApp()
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
Page({
  data: {
    taskTypes: ['取物', '租借', '其他'],
    imgs:[],
    title: '',
    description: '',
    money: 0,
    taskType: '',
  },

  /**
   * 组件的方法列表
   */
  chooseImg: function() {
    var tempImgs = this.data.imgs;
    var len = tempImgs.length;
    wx.chooseImage({
      count: 3,
      sizeType: [],
      sourceType: [],
      success: function(res) {
        var addImg = res.tempFilePaths;
        var addLen = addImg.length;
        if ((len + addLen) > 3) {
          for (var i = 0; i < (addLen - len); i++) {
            var str = {};
            str.pic = addImg[i];
            tempImgs.push(str);
          }
        } else {
          for (var j = 0; j < addLen; j++) {
            var str = {};
            str.pic = addImg[j];
            tempImgs.push(str);
          }
        }
        console.log(tempImgs);
        this.setData({
          imgs: tempImgs
        })
        that.upLoadImg();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  upLoadImg: function() {

  },
  handleSubmit: function() {
    console.log(this.data.title,this.data.description,this.data.money);
    network.POST({
      url: api.publish,
      data: {
        title: this.data.title,
        content: this.data.content,
        payment: this.data.payment,
      },
      success: res => {
        // console.log("login data:", res)
        if (res.data && res.code !== -1 && res.data.userId) {
          this.globalData.userId = res.data.userId;
          this.globalData.phone = res.data.phone;
          // 初始化websocket
          // ws.launch(res.data.userId);
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  }
})
