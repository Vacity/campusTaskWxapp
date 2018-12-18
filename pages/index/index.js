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
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.showModal({
            title: '注意',
            showCancel: false,
            confirmText: '授权',
            content: '为了您更好的体验,请先同意授权',
            success: function (res) {
              wx.navigateTo({
                url: '../index/right'
              });
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var scope = this;
        // 登录
        wx.login({
          success: res => {
            network.GET({
              url: api.loginsession + "?appid=wx794fcc0f508c628f&secret=3ef2b04022c3108f6d5a0fc781e9db37&js_code=" + res.code + "&grant_type=authorization_code",
              success: res2 => {
                network.GET({
                  url: api.login + res2.openid,
                  success: response => {
                    if (response.success) {
                      if (response.content)
                        app.globalData.user = response.content;
                      else {
                        var infoRes = app.globalData;
                        var info = infoRes.userInfo
                        network.POST({
                          url: api.register,
                          data: {
                            username: res2.openid,
                            nickname: infoRes.userInfo.nickName,
                            gender: infoRes.userInfo.gender,
                            avatar: infoRes.userInfo.avatarUrl
                          },
                          success: registerResponse => {
                            if (registerResponse.success == true) {
                              app.globalData.user = registerResponse.content;
                            } else {
                              wx.showToast({
                                title: '注册失败',
                                icon: 'none',
                                duration: 5000
                              })
                            }
                          }
                        })
                      }
                    } else {
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 5000
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }
    })

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
