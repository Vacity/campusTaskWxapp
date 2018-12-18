const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card: 1,
    activeRelease: 'filter-active',
    activeAccept: '',
    releasedTasks:[1,2,3,4],
    acceptedTasks:[1,2,3,4],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    network.GET({
      url: api.getTaskPublished + "1",
      success: res => {
        if (res.success) {
          this.setData({
            releasedTasks: res.content
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
   * 修改已发布的任务信息
   */
  handleReleaseModify: function(event){
      
      wx.navigateTo({
        url: '../modify/modify?id=1'
      })
    
  },

  /**
   * 取消已发布的任务
   */
  handleReleaseCancel: function(e){
    // Array.prototype.indexOf = function (val) {
    //   for (var i = 0; i < this.length; i++) {
    //     if (this[i].id == val) return i;
    //   }
    //   return -1;
    // };

    // Array.prototype.remove = function (val) {
    //   var index = this.indexOf(val);
    //   if (index > -1) {
    //     this.splice(index, 1);
    //   }
    // };

    network.POST({
      url: api.closeTask + e.currentTarget.id,
      success: res => {
        if (res.success) {
          // releasedTasks.remove(e.currentTarget.id);
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
   * 确认发布的任务完成
   */
  handleReleaseFinish: function(e){
    network.POST({
      url: api.confirmTask + e.currentTarget.id,
      success: res => {
        if (res.success) {
          // releasedTasks.remove(e.currentTarget.id);
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
   * 取消接受的任务
   */

  handleAcceptCancel: function(e){
    network.POST({
      url: api.closeTask + e.currentTarget.id,
      success: res => {
        if (res.success) {
          // releasedTasks.remove(e.currentTarget.id);
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
   * 确认接受的任务已完成
   */
  handleAcceptFinish: function(e){
    network.POST({
      url: api.finishTask + e.currentTarget.id,
      success: res => {
        if (res.success) {
          // releasedTasks.remove(e.currentTarget.id);
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
   * 查看发布的任务
   */
  showReleasedTasks: function(){
    this.setData({
      activeRelease: 'filter-active',
      activeAccept: '',
      card: 1
    })

    network.GET({
      url: api.getTaskPublished + "1",
      success: res => {
        if (res.success) {
          this.setData({
            releasedTasks: res.content
          });
          this.formatReleasedTaskTime();
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
   * 查看接受的任务
   */
  showAcceptedTasks: function(){
    this.setData({
      card:2,
      activeRelease: '',
      activeAccept: 'filter-active',
    })

    network.GET({
      url: api.getTaskAccepted + "1",
      success: res => {
        if (res.success) {
          this.setData({
            acceptedTasks: res.content
          });
          this.formatAcceptedTaskTime();
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


  formatReleasedTaskTime: function () {
    var list = this.data.releasedTasks;
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].start = timeApi.formatDateAndTime(new Date(list[i].start));
      list[i].end = timeApi.formatDateAndTime(new Date(list[i].end));
    }
    this.setData({
      releasedTasks: list
    });
  },

  formatAcceptedTaskTime: function () {
    var list = this.data.acceptedTasks;
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].start = timeApi.formatDateAndTime(new Date(list[i].start));
      list[i].end = timeApi.formatDateAndTime(new Date(list[i].end));
    }
    this.setData({
      acceptedTasks: list
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})