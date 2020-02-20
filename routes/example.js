
exports.route = {
  /**
   * 该接口名称
   * @param {type}    paramName Description  是否必须
   * 例子：
   * @param {String}  cardnum   一卡通号       √
   * 
   */
  async get({ params }) {//GET方法
    
    if (!params) {
      throw '没有必须字段'//记得非法throw要throw出具体错误
    }else {
      return "这是测试返回"//这里的res 会存在于返回响应的 result字段 里
    }
  }
}