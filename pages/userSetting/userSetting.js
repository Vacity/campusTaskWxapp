// pages/userSetting/userSetting.js
const network = require("../../utils/network.js");
const {
  api
} = require("../../utils/config.js");
const timeApi = require('../../utils/util.js');
const app = getApp();
const stateMap = new Map([
  ["UNCHECKED", "未审核"],
  ["CHECKING", "审核中"],
  ["CHECKED", "已通过审核"],
  ["UNAPPROVED", "未通过"],
  ["CLOSED", "封号"]
]);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    starNum: 0,
    emptyStarNum: 0,
    halfStar: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadUserInfo();
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
    this.loadUserInfo();
    wx.stopPullDownRefresh();
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

  loadUserInfo: function() {
    network.GET({
      url: api.getUserById + app.globalData.user.id,
      success: res => {
        if (res.success) {
          app.globalData.user = res.content;

          res.content.name = res.content.name ? res.content.name : "";
          res.content.phone = res.content.phone ? res.content.phone : "";
          res.content.joinDate = timeApi.formatDateAndTime(new Date(res.content.joinDate));
          res.content.gender = res.content.gender ? "男" : "女";
          res.content.state = stateMap.get(res.content.state);

          var starNum = Math.floor(res.content.comment_star);
          var emptyStarNum = 5 - starNum;
          var halfStar = false;
          if (res.content.comment_star - starNum > 0) {
            halfStar = true;
            emptyStarNum--;
          }

          this.setData({
            userInfo: res.content,
            starNum: starNum,
            emptyStarNum: emptyStarNum,
            halfStar: halfStar
          });
        } else {
          wx.showToast({
            title: '查询失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    });
  }
})