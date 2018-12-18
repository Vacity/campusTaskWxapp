//app.js
const network = require("/utils/network.js")
const { api } = require("/utils/config.js")
const timeApi = require('/utils/util.js');

App({
  onLaunch: function () {
    this.globalData.user = null;
    wx.authorize({
      scope: 'scope.userInfo'
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
                      if(response.content)
                        this.globalData.user = response.content;
                      else{
                        wx.getUserInfo({
                          success: infoRes => {
                            var info = infoRes.userInfo
                            console.log(infoRes.userInfo);
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
                                  this.globalData.user = registerResponse.content;
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
    user: null
  }
})