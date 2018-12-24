// pages/userSetting/userPicture.js
const server = "http://47.101.183.63:8081";
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
    imageFlag: "",
    buttonDisabled: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var flag = false;
    if (app.globalData.user.pictureUrl && app.globalData.user.pictureUrl != '') {
      flag = true;
    }
    var buttonDisabled = true;
    if (options.value == "未审核" || options.value == "未通过" ||options.value == "封号"){
      buttonDisabled = false;
    }
    this.setData({
      state: options.value,
      imageSrc: app.globalData.user.pictureUrl,
      imageFlag: flag,
      buttonDisabled: buttonDisabled
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
  },

  submit(e) {
    console.log(this.data.imageSrc);
    wx.uploadFile({
      url: api.uploadFile,
      filePath: this.data.imageSrc,
      name: 'myfiles',
      success(res) {
        res = JSON.parse(res.data)
        if (res.success) {
          var data = {};
          data.id = app.globalData.user.id;
          data.pictureUrl = server + res.content;
          data.state = "CHECKING";
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
      }
    })
  }
})