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
    activeType: '',
    activeTime: 'filter-active',
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
        }else{
          wx.getUserInfo({
            success: res =>{
              app.globalData.userInfo = res.userInfo;
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
    this.setData({
      activeType: '',
      activeTime: 'filter-active',
      activeMoney: '',
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
  onShow: function () {
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
      if (!list[i].publisherIconUrl) {
        list[i].publisherIconUrl ="../../utils/imgs/defaultAvatar.gif";
      }
      if (list[i].pictureUrl && list[i].pictureUrl!="") { 
        list[i].pictureUrl = list[i].pictureUrl.split("@");
      }
    }
    this.setData({
      taskList: list
    });
  },
  handleClick: function(e){
    var task = e.target.dataset.item;
    if (task.publisher == app.globalData.user.id){
      wx.showToast({
        title: '不可以接受自己发布的任务喔',
        icon: 'none',
        duration: 2000
      })
    }
    // task.orderTaker = app.globalData.user.id;
    // task.start = new Date(Date.parse((task.start + ":00").replace(/-/g, "/"))),
    // task.end = new Date(Date.parse((task.end + ":00").replace(/-/g, "/"))),
    network.GET({
      url: api.takeTask + task.id + "/" + app.globalData.user.id,
      success: res => {
        if (res.success) {
          wx.showToast({
            title: '接单成功',
            icon: 'none',
            duration: 2000
          })
          this.onLoad();
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  previewImg: function(event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }
})
