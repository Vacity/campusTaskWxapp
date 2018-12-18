const server = "http://47.101.183.63:8081";
module.exports = {
  api: {
    login: server + "/auth/login",
    publish: server + "/task/add",
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
    updateUser: server + "/user/update"
  }
}
