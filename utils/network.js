//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}
//DELETE请求
function DELETE(requestHandler) {
  request('DELETE', requestHandler)
}
//PUT请求
function PUT(requestHandler) {
  request('PUT', requestHandler)
}
//带loading提示的GET请求
function GETLoading(requestHandler) {
  requestLoading('GET', requestHandler)
}
//带loading提示的POST请求
function POSTLoading(requestHandler) {
  requestLoading('POST', requestHandler)
}
function request(method, requestHandler) {
  //注意：可以对params加密等处理
  const { url, data } = requestHandler;

  wx.request({
    url,
    data,
    method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      //注意：可以对参数解密等处理
      requestHandler.success && requestHandler.success(res.data)
    },
    fail: function () {
      requestHandler.fail && requestHandler.fail()
    },
    complete: function (res) {
      // complete
      requestHandler.complete && requestHandler.complete()
      console.log("request complete", res)

    }
  })
}

function requestLoading(method, requestHandler) {

  wx.showNavigationBarLoading()
  wx.showLoading({
    title: '正在加载数据',
  })

  const { url, data } = requestHandler;

  wx.request({
    url,
    data,
    method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      wx.hideNavigationBarLoading()
      wx.hideLoading()
      requestHandler.success && requestHandler.success(res.data)
    },
    fail: function (res) {
      requestHandler.fail && requestHandler.fail()
    },
    complete: function (res) {
      // complete
      requestHandler.complete && requestHandler.complete()
      console.log("request complete", res)
    }
  })
}

module.exports = {
  GET, POST, GETLoading, POSTLoading, PUT, DELETE
}