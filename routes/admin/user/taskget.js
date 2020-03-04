const mongodb = require('../../../database/mongodb')

const newtime = () => new Date((new Date).valueOf() + 60* 60 * 1000*8)
const totalDay = (time)=>Math.ceil(( time - new Date(newtime().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
    async get({limt=0,all=false}) {
        try {
            let userdb = await mongodb("user")
            let users=await userdb.find().toArray()
            users=users.filter(res=>{
                for(i in res.doneList){
                    let task=res.doneList[i]
                    if(task.num==limt){
                        if(all)return true
                        else {
                            if(totalDay(task.time)==totalDay(newtime()))return true
                        }
                    }
                }
                return false
            })
        } catch (e) {
            console.log(e)
            throw e
        }
    }
}