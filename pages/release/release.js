// pages/release/release.js
const app = getApp()
const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');
const server = "http://47.101.183.63:8081";
Page({
  data: {
    taskTypes: ['取物', '租借', '其他'],
    imgs:[],
    title: '',
    description: '',
    money: 0,
    taskType: '取物',
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: '',
  },

  /**
   * 方法列表
   */
  onLoad: function () {
    var now = timeApi.formatDate(new Date());
    var time = timeApi.formatTime(new Date());
    this.setData({
      startDate: now,
      startTime: time,
      endDate: now,
      endTime: time,
    })
  },
  chooseImg: function() {
    var that = this;
    var tempImgs = this.data.imgs;
    var len = tempImgs.length;
    wx.chooseImage({
      count: 9-len,
      sizeType: [],
      sourceType: [],
      success: function(res) {
        var addImg = res.tempFilePaths;
        for(var i =0;i<addImg.length;i++){
          wx.uploadFile({
            url: api.uploadFile,
            filePath: addImg[i],
            name: 'myfiles',
            success: function (res2) {
              res2 = JSON.parse(res2.data)
              if (res2.success){
                tempImgs.push(server+res2.content);
                that.setData({
                  imgs: tempImgs
                })
              }
            },
            fail: function(res2) {
            }
          })
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '无法选择图片',
          icon: 'none',
          duration: 5000
        })
      },
      complete: function(res) {},
    })
  },
  handleSubmit: function() {
    var typeData="";
    if (this.data.taskType === '取物'){
      typeData='DELIVER';
    }else if(this.data.taskType === '租借'){
      typeData="RENT";
    }else{
      typeData="OTHER";
    }
    network.POST({
      url: api.publish,
      data: {
        title: this.data.title,
        content: this.data.description,
        payment: this.data.money,
        // start: this.data.startDate + " " + this.data.startTime+":00",
        // end: this.data.endDate + " " + this.data.endTime+":00",
        start: new Date(Date.parse((this.data.startDate + " " + this.data.startTime + ":00").replace(/-/g, "/"))),
        end: new Date(Date.parse((this.data.endDate + " " + this.data.endTime + ":00").replace(/-/g, "/"))),
        type: typeData,
        publisher: app.globalData.user.id,
        publisherIconUrl: app.globalData.user.avatar
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 5000
          })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },
  bindInputTitle: function(e) {
    this.setData({
      title: e.detail.detail.value
    })
  },
  bindInputMoney: function (e) {
    this.setData({
      money: e.detail.detail.value
    })
  },
  bindInputDescription: function (e) {
    this.setData({
      description: e.detail.detail.value
    })
  },
  setTaskType: function(e) {
    this.setData({
      taskType: this.data.taskTypes[e.detail.value]
    })
  },
  setStartDate: function(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  setStartTime: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  setEndDate: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  setEndTime: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
})
