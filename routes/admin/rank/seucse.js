const mongodb = require('../../../database/mongodb')

exports.route ={
    async get(){
        let userdb = await mongodb("user")
        let users = await userdb.find().toArray()
        let seucse={
            "组织部":{label:"根正苗红",num:0,arr:[]},
            "体育部":{label:"体育部",num:0,arr:[]},
            "宣传部":{label:"小吃部",num:0,arr:[]},
            "生学部":{label:"爱生活学习脱单",num:0,arr:[]},
            "外联部":{label:"cczm",num:0,arr:[]},
            "文化部":{label:"文化部",num:0,arr:[]}
        }
        
        users.forEach(user=>{
            Object.keys(seucse).forEach(c=>{
                if(user.name.includes(seucse[c].label)){
                    seucse[c].num+=user.point
                    seucse[c].arr.push({
                        name:user.name,
                        cardnum:user.cardnum, 
                        QQ:user.QQ,
                        point:user.point
                    })
                }
            })
        })
        return seucse
    }
}