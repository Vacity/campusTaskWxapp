// pages/release/release.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    taskTypes: ['取物', '租借', '其他'],
    imgs:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    chooseImg: function() {
      var tempImgs = this.data.imgs;
      var len = tempImgs.length;
      wx.chooseImage({
        count: 3,
        sizeType: [],
        sourceType: [],
        success: function(res) {
          var addImg = res.tempFilePaths;
          var addLen = addImg.length;
          if ((len + addLen) > 3) {
            for (var i = 0; i < (addLen - len); i++) {
              var str = {};
              str.pic = addImg[i];
              tempImgs.push(str);
            }
          } else {
            for (var j = 0; j < addLen; j++) {
              var str = {};
              str.pic = addImg[j];
              tempImgs.push(str);
            }
          }
          console.log(tempImgs);
          this.setData({
            imgs: tempImgs
          })
          that.upLoadImg();
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    upLoadImg: function() {

    }
  }
})
