//app.js
const network = require("/utils/network.js")
const { api } = require("/utils/config.js")
const timeApi = require('/utils/util.js');

App({
  onLaunch: function () {
    this.globalData.user = null;
    // 获取用户信息
  },
  globalData: {
    user: null
  }
})