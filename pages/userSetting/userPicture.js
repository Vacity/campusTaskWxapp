// pages/userSetting/userPicture.js
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
    state: "",
    imageSrc: "",
    imageFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var flag = false;
    if (app.globalData.user.pictureUrl && app.globalData.user.pictureUrl != '') {
      flag = true;
    }
    this.setData({
      state: options.value,
      imageSrc: app.globalData.user.pictureUrl,
      imageFlag: flag
    });
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

  chooseImage(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        if (res.tempFilePaths.length > 0) {
          this.setData({
            imageSrc: res.tempFilePaths[0],
            imageFlag: true
          });
        }
      }
    })
  }
})