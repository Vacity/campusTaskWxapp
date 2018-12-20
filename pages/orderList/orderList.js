const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js')
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    card: 1,
    activeRelease: 'filter-active',
    activeAccept: '',
    releasedTasks:[],
    acceptedTasks:[],
    showDetail:false,
    currentTask:{},
    starIndex:1,
    rate:false,
    rateId:-1,
    publisherInfo:{},
    reportTask: {},
    report:false,
    reportContent: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

 
    // network.GET({
    //   url: api.getTaskPublished + this.data.user.id,
    //   success: res => {
    //     if (res.success) {
    //       this.setData({
    //         releasedTasks: res.content.tasks
    //       });
    //       this.formatReleasedTaskTime();
    //       this.preprocessReleaseData();
    //     } else {
    //       wx.showToast({
    //         title: '查询失败',
    //         icon: 'none',
    //         duration: 5000
    //       })
    //     }
    //   }
    // })
  },


  handleStarChange: function(e){
    const index = e.detail.index;
    this.setData({
      'starIndex': index
    })
  },
  /**
   * 修改已发布的任务信息
   */
  handleReleaseModify: function(e){
      
      wx.navigateTo({
        url: '../modify/modify?id=' + e.currentTarget.id
      })
    
  },
  /**
     * 投诉已发布的任务信息
     */
  handleCancelReport: function(){
    this.setData({
      report: false,
    });
  },
  handleConfirmReport: function() {
    var task = this.data.reportTask;

    network.POST({
      url: api.complain,
      data: {
        id: task.id,
        publisher: task.publisher,
        orderTaker: task.orderTaker,
        content: this.data.reportContent
      },
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '投诉成功',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            report: false,
          });
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
          this.setData({
            report: false,
          });
        }
      }
    })
  },
  bindInputReport: function(e) {
    this.setData({
      reportContent: e.detail.detail.value
    })
  },
  handleReleaseReport: function (e) {
    this.setData({
      reportTask: e.target.dataset.set,
      report: true,
      reportContent: "",
    });
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
    this.setData({
      rate:true,
      rateId:e.currentTarget.id
    })
    // network.POST({
    //   url: api.confirmTask + e.currentTarget.id,
    //   success: res => {
    //     if (res.success) {
    //       // releasedTasks.remove(e.currentTarget.id);
    //     } else {
    //       wx.showToast({
    //         title: '不能确认完成',
    //         icon: 'none',
    //         duration: 5000
    //       })
    //     }
    //   }
    // })
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
            title: '此任务现在不可取消',
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
            title: '确认完成失败',
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },


  handleConfirmRate: function(e){
    network.POST({
      url: api.commentTask,
      data: {
        taskId: this.data.rateId,
        star: this.data.starIndex,
      },
      success: res => {
        if (res.success == true) {

          network.POST({
            url: api.confirmTask + this.data.rateId,
            success: res => {
              if (res.success) {
                // releasedTasks.remove(e.currentTarget.id);
              } else {
                wx.showToast({
                })
              }
            }
          })
          wx.showToast({
            title: '评论成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '评论失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })



      this.setData({
        rate:false,
        rateIndex:0,
      })
      

  },

  handleCancelRate: function(e){
    this.setData({
      rate: false,
      rateIndex: 0,
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
      url: api.getTaskPublished + this.data.user.id,
      success: res => {
        if (res.success) {
          this.setData({
            releasedTasks: res.content.tasks
          });
          this.formatReleasedTaskTime();
          this.preprocessReleaseData();
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
      url: api.getTaskAccepted + this.data.user.id,
      success: res => {
        if (res.success) {
          this.setData({
            acceptedTasks: res.content.tasks
          });
          this.formatAcceptedTaskTime();
          this.preprocessAcceptData();
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

//查看任务详情
  toggleDetail: function(e) {
    this.setData({
      showDetail: !this.data.showDetail
    });
    if (this.data.showDetail) {

      network.GET({
        url: api.getUserById + e.detail.data.publisher,
        success: res => {
          if (res.success) {
            this.setData({
              publisherInfo: res.content
            })
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none',
              duration: 5000
            })
          }
        }
      });
      
      this.setData({
        currentTask: e.detail.data
      })
    }




  },

  preprocessReleaseData: function(){
    var list=this.data.releasedTasks;
    for(var i =0,len=list.length;i<len;i++){
        if(list[i].state=="TO_TAKE_ORDER"){
            list[i].modifyDisable=false;
            list[i].cancelDisable=false;
            list[i].confirmDisable=true;
            list[i].reportDisable = false;
            list[i].stateText="待接单";
        }
        else if(list[i].state=="CLOSED"){
          list[i].modifyDisable = true;
          list[i].cancelDisable = true;
          list[i].confirmDisable = true;
          list[i].reportDisable = false;
          list[i].stateText="已取消";
        }
        else if(list[i].state=="ORDER_TAKED"){
          list[i].modifyDisable = true;
          list[i].cancelDisable = true;
          list[i].confirmDisable = true;
          list[i].reportDisable = true;
          list[i].stateText="已接单";
        }
        else if(list[i].state=="FINISHED"){
          list[i].modifyDisable = true;
          list[i].cancelDisable = true;
          list[i].confirmDisable = false;
          list[i].reportDisable = true;
          list[i].stateText="已完成";
        }
        else if(list[i].state=="FINISHED_CONFIRM"){
          list[i].modifyDisable = true;
          list[i].cancelDisable = true;
          list[i].confirmDisable = true;
          list[i].reportDisable = false;
          list[i].stateText="已结束";
        }
        else if (list[i].state =="COMPLAINING"){
          list[i].modifyDisable = true;
          list[i].cancelDisable = true;
          list[i].confirmDisable = true;
          list[i].reportDisable = false;
          list[i].stateText="申诉中";
        }
    }
    this.setData({
      releasedTasks: list
    })

  },


  preprocessAcceptData: function () {
    var list = this.data.acceptedTasks;
    for (var i = 0, len = list.length; i < len; i++) {
      if (list[i].state == "ORDER_TAKED") {
        list[i].cancelDisable = false;
        list[i].confirmDisable = false;

        list[i].stateText = "已接单";
      }
      else if (list[i].state == "FINISHED") {
        list[i].cancelDisable = true;
        list[i].confirmDisable = true;
        list[i].stateText = "已完成";
      }
      else if (list[i].state == "FINISHED_CONFIRM") {
        list[i].cancelDisable = true;
        list[i].confirmDisable = true;
        list[i].stateText = "已结束";
      }
      else if (list[i].state == "COMPLAINING") {
        list[i].cancelDisable = true;
        list[i].confirmDisable = true;

        list[i].stateText = "申诉中";
      }
    }
    this.setData({
      acceptedTasks: list
    })
  },


  formatReleasedTaskTime: function () {
    var list = this.data.releasedTasks;
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].start = timeApi.formatDateAndTime(new Date(list[i].start));
      list[i].end = timeApi.formatDateAndTime(new Date(list[i].end));
      if (!list[i].publisherIconUrl) {
        list[i].publisherIconUrl = "../../utils/imgs/defaultAvatar.gif";
      }
      if (list[i].pictureUrl && list[i].pictureUrl != "") {
        list[i].pictureUrl = list[i].pictureUrl.split("@");
      }
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
      if (!list[i].publisherIconUrl) {
        list[i].publisherIconUrl = "../../utils/imgs/defaultAvatar.gif";
      }
      if (list[i].pictureUrl && list[i].pictureUrl != "") {
        list[i].pictureUrl = list[i].pictureUrl.split("@");
      }
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
    this.setData({
      user: app.globalData.user
    })
    network.GET({
      url: api.getTaskPublished + this.data.user.id,
      success: res => {
        if (res.success) {
          this.setData({
            releasedTasks: res.content.tasks
          });
          this.formatReleasedTaskTime();
          this.preprocessReleaseData();
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


  previewImg: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
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