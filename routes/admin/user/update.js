const mongodb = require('../../../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "/admin/user/update"

exports.route = {
    async get({}) {
        console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<");
        try{
            

        }catch(e){
            console.log(e);
            return e    
        }
        return "更新成功"
    }
}