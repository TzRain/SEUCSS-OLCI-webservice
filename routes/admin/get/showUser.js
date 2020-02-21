const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/get/showUser"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");

        let user = await mongodb('user')
        let res
        try {
            await user.find();
        } catch (e) {
            console.log(e)
            throw "查看失败"
        }
        return  "查看成功"
    }
}