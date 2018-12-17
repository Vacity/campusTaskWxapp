// pages/userSetting/userSetting.js
const network = require("../../utils/network.js")
const {
  api
} = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    network.GET({
      // url: api.getUserById + app.globaldata.userId,
      url: api.getUserById + "1",
      success: res => {
        if (res.success) {
          res.content.joinDate = timeApi.formatDateAndTime(new Date(res.content.joinDate));
          res.content.gender = res.content.gender ? "女" : "男";
          this.setData({
            userInfo: res.content
          });
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 5000
          })
        }
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

  }
})