const mongodb = require('../database/mongodb')
const tasks = require('../static/tasks')

exports.route = {
	async get(res) {
        let userdb= await mongodb("user")
        let teamdb= await mongodb("team")

        if(changeQQ){
            let QQ="213182000 "
            let newQQ="213182000"
            await userdb.updateOne({QQ},{ $set: { newQQ } });
        }

        if(res.showtasks){
           return tasks;
        }
        if(res.remove){
            userdb.remove()
            teamdb.remove()
            return "清空数据成功"
        }
        return "访问成功"
    }
}
