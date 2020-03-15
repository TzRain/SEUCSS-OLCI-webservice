const mongodb = require('../database/mongodb')
const tasks = require('../static/tasks')

exports.route = {
	async get(res) {
        let userdb= await mongodb("user")
        let teamdb= await mongodb("team")

        

        if(res.changeQQ){
            let num="213182000"
            let {_id}=await userdb.findOne({num});
            num="233333333"
            QQ="233333333"
            await userdb.updateOne({_id},{ $set: { QQ,num } });
            console.log("ok2");
        }
        
        if(res.changeQQ){
            let num="213182000 "
            let {_id}=await userdb.findOne({num});
            num="213182000"
            await userdb.updateOne({_id},{ $set: { num } });
            console.log("ok1");
        }
        return "ok"
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
