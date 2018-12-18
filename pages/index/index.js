const network = require("../../utils/network.js")
const { api } = require("../../utils/config.js")
const timeApi = require('../../utils/util.js');
const app = getApp()

Page({
  data: {
    userInfo: {},
    taskList: [],
    activeFilter:0,
    taskTypes: ['取物','租借','其他'],
    taskType: "取物",
    taskTypeData: ['DELIVER','RENT','OTHER'],
    activeType: 'filter-active',
    activeTime: '',
    activeMoney: '',
    currentTask: {},
    showDetail: false,
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '../../utils/imgs/1.png'
      }, {
        link: '/pages/index/index',
        url: '../../utils/imgs/2.jpeg'
      }, {
        link: '/pages/index/index',
        url: '../../utils/imgs/3.jpg'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toRelease: function() {
    wx.navigateTo({
      url: '../release/release'
    })
  },
  onLoad: function () {
    network.GET({
      url: api.getTaskByType + "DELIVER",
      success: res => {
        if (res.success) {
         this.setData({
           taskList: res.content
         });
          this.formatTaskListTime();
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
  onshow: function () {
    this.onLoad();
  },
  getTaskByType : function(e) {
    this.setData({
      taskType: this.data.taskTypes[e.detail.value],
      activeType : 'filter-active',
      activeTime : '',
      activeMoney : '',
    })
    network.GET({
      url: api.getTaskByType + this.data.taskTypeData[e.detail.value],
      success: res => {
        if (res.success) {
          this.setData({
            taskList: res.content
          });
          this.formatTaskListTime();
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
  getTaskByTime : function(e){
    this.setData({
      activeType : '',
      activeTime : 'filter-active',
      activeMoney : '',
    });
    network.GET({
      url: api.getTaskByTime,
      success: res => {
        if (res.success) {
          this.setData({
            taskList: res.content
          });
          this.formatTaskListTime();
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
  getTaskByMoney: function(e){
    this.setData({
      activeType : '',
      activeTime : '',
      activeMoney : 'filter-active',
    });
    network.GET({
      url: api.getTaskByMoney,
      success: res => {
        if (res.success) {
          this.setData({
            taskList: res.content
          });
          this.formatTaskListTime();
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
  toggleDetail: function(e){
    this.setData({
      showDetail: !this.data.showDetail
    });
    if(this.data.showDetail){
      this.setData({
        currentTask: e.detail.data
      })
    }
  },
  formatTaskListTime: function(){
    var list = this.data.taskList;
    for(var i =0,len=list.length;i<len;i++){
      list[i].start = timeApi.formatDateAndTime(new Date(list[i].start));
      list[i].end = timeApi.formatDateAndTime(new Date(list[i].end));
    }
    this.setData({
      taskList: list
    });
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
