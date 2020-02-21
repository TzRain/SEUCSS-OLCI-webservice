const mongodb = require('../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/rank/get"

exports.route = {
    async get() {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try {
            let userdb = await mongodb("user")
            let arr = await userdb.find().sort({ rating: 1 }).toArray();
            let rank= arr.filter((user)=>user.rating>0).map((user) => {
                return {
                    name:user.name,
                    rating:user.rating
                }
            })
            return rank
        } catch (e) {
            console.log(e);
            throw "更新失败"
        }
        return "更新成功"
    }
}