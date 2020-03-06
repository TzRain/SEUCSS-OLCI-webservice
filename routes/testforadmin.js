const mongodb = require('../database/mongodb')
const tasks = require('../static/tasks')

exports.route = {
	async get(res) {
        let userdb= await mongodb("user")
        let teamdb= await mongodb("team")

        if(res.changenum){
            let num="213182000 "
            let newnum="213182000"
            await userdb.updateOne({num},{ $set: { newnum } });
            return "ok"
        }

        // if(res.showtasks){
        //    return tasks;
        // }
        // if(res.remove){
        //     userdb.remove()
        //     teamdb.remove()
        //     return "清空数据成功"
        // }
        return "访问成功"
    }
}
