const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/point/update"

exports.route = {
    async get({ QQ, v }) {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            let userdb = await mongodb("user")
            let user = await userdb.findOne({ QQ })
            let { rating } = user
            rating+=Number(v)
            await userdb.updateOne({ QQ }, { $set: { rating } })
        } catch (e) {
            console.log(e);
            throw "修改失败"
        }
        return "修改成功"
    }
}