const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/team/update"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            
        } catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "排名更新成功"
    }
}