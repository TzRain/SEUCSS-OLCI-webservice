const mongodb = require('../../../database/mongodb')

const newtime = () => new Date((new Date).valueOf() + 60* 60 * 1000*8)
const totalDay = (time)=>Math.ceil(( time - new Date(newtime().getFullYear().toString()))/(24*60*60*1000))+1;

exports.route = {
    async get({limt,all}) {
        if(!limt)limt=0;
        if(!all)all=false
        console.log(Number(limt));
        try {
            let userdb = await mongodb("user")
            let users=await userdb.find().toArray()
            users=users.filter(res=>{
                for(i in res.doneList){
                    let task=res.doneList[i]
                    if(Number(task.num)==Number(limt)){
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