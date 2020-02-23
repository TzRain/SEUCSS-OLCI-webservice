const mongodb = require('../database/mongodb')
const ObjectId = require('mongodb').ObjectId

const path = "test"

exports.route = {
	async get(res) {
		console.log("正在访问>>>>>>>>>" + path + "<<<<<<<<<<")
		console.log(res);
        // console.log(QQ);
        // console.log(token);        
        return "访问成功"
    }
}
