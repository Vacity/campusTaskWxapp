// pages/userSetting/userCoin.js
const network = require("../../utils/network.js");
const {
  api
} = require("../../utils/config.js");
const app = getApp();
const typeMap = new Map([
  ["FINISH_ORDER", "完成任务"],
  ["CHARGE", "充值"],
  ["PAY_ORDER", "发布任务"],
  ["CANCEL_ORDER", "取消任务"]
]);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    coins: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    network.GET({
      url: api.getCoinsByUserId.replace("{id}", app.globalData.user.id),
      success: res => {
        if (res.success) {
          for (var i = 0, len = res.content.length; i < len; i++) {
            res.content[i].reason = typeMap.get(res.content[i].reason);
          }
          this.setData({
            coins: app.globalData.user.coins,
            list: res.content.reverse()
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