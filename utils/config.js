const server = "http://47.101.183.63:8081";
module.exports = {
  api: {
    login: server + "/auth/login",
    publish: server+ "/task/add"
  }
}
