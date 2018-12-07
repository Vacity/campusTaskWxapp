//app.js
const network = require("/utils/network.js")
const { api } = require("/utils/config.js")
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var scope = this;
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            network.GET({
              url: api.login + "?code=" + res.code,
              success: res => {
                // console.log("login data:", res)
                if (res.data && res.code !== -1 && res.data.userId) {
                  this.globalData.userId = res.data.userId;
                  this.globalData.phone = res.data.phone;
                  // 初始化websocket
                  // ws.launch(res.data.userId);
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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})