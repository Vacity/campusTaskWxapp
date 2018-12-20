// pages/userSetting/userModify.js
const network = require("../../utils/network.js");
const {
  api
} = require("../../utils/config.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type = options.type;
    this.setData({
      type: options.type,
      value: options.value
    });
    if (type == "name") {
      wx.setNavigationBarTitle({
        title: '修改姓名'
      })
    } else if (type == "gender") {
      wx.setNavigationBarTitle({
        title: '修改性别'
      })
    } else if (type == "phone") {
      wx.setNavigationBarTitle({
        title: '修改手机号码'
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

  confirmModify: function(event) {
    var type = this.data.type;
    var data = {};
    data.id = app.globalData.user.id;
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
      data.gender = event.detail.value == "男" ? 1 : 0;
    } else if (type == "phone") {
      var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(event.detail.value)){
        wx.showToast({
          title: '手机号码格式错误',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      data.phone = event.detail.value;
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