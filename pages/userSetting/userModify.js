// pages/userSetting/userModify.js
const network = require("../../utils/network.js");
const {
  api
} = require("../../utils/config.js");
const app = getApp();
var type;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    type = options.type;
    this.setData({
      value: options.value
    });
    if (type == "name") {
      wx.setNavigationBarTitle({
        title: '修改姓氏'
      })
    } else if (type == "gender") {
      wx.setNavigationBarTitle({
        title: '修改性别'
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

  },

  validData: function(value) {
    var data = {};
    // data.id = app.globaldata.userId;
    data.id = 1;
    if (type == "name") {


      data.name = value;
    } else if (type == "gender") {
      if (value != "男" && value != "女") {

      }
      data.gender = value == "男" ? 0 : 1;
    }
    return data;
  },

  confirmModify: function(event) {
    console.log(event.detail.value);
    var data = {};
    // data.id = app.globaldata.userId;
    data.id = 1;
    if (type == "name") {
      data.name = event.detail.value;
    } else if (type == "gender") {
      if (event.detail.value != "男" && event.detail.value != "女") {
        wx.showToast({
          title: '性别只能填"男"或者"女"',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      data.gender = event.detail.value == "男" ? 0 : 1;
    }

    network.POST({
      url: api.updateUser,
      data: data,
      success: res => {
        if (res.success) {
          var pages = getCurrentPages();
          if (pages.length > 1) {
            var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
            // 上一页面刷新然后返回
            beforePage.onLoad();
            wx.navigateBack({
              delta: 1
            });
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 2000
            });
          }
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 5000
          });
        }
      }
    })
  }
})