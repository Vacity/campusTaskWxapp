const server = "http://47.101.183.63:8081";
module.exports = {
  api: {
    loginsession: "https://api.weixin.qq.com/sns/jscode2session",
    login: server + "/user/username/",
    register: server+ "/user/add",
    publish: server + "/task/add",
    takeTask: server+ "/task/take/",
    getTaskByType: server + "/task/type/", 
    getTaskByTime: server + "/task/time",
    getTaskByMoney: server + "/task/payment",
    uploadFile: server + "/uploadfile",
    getUserById: server + "/user/",
    getTaskPublished: server + "/task/publisher/",
    getTaskAccepted: server + "/task/taker/",
    closeTask: server + "/task/close/",
    finishTask: server + "/task/finish",
    confirmTask: server + "/task/confirm",
    finishTask: server + "/task/finish/",
    confirmTask: server + "/task/confirm/",
    modifyTask: server + "/task/update",
    updateUser: server + "/user/update",
    getCoinsByUserId: server + "/user/{id}/coins",
    getTaskDetail: server + "/task/id/",
    commentTask: server + "/task/comment/add",
    complain: server+ "/complain/add"
  }
}
