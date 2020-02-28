# seu生学部2020春季线上打卡小活动 

# 接口文档

**时间** 2020-2-23

## 说明

**使用时的名称请严格按照下面给出的规范**

### 接口需要的数据的说明

**注意：**没有特意说明，需要数据默认是**params**中需要的数据

**注意：** **除了登陆和注册外Headers均需要Authorization值**

**注意：**如果除了**Authorization**没有其他需要的信息则直接省略

### 返回值的说明

 **通常情况下返回值的情况**
**成功**：

```javascript
{
    "success": true,
    "code": 200,
    "result": 
}
```

**失败**：
**reason**:返回失败的原因

```javascript
{
    "success": false,
    "code": ,
    "reason": 
}
```

由于返回值结构基本相似下面展示时仅给出"**result**","**reason**"的返回结果

**注意**：如果"**result**","**reason**"为如下所示

```javascript
"result": "请重新登录"（或者其他的提示信息）
```

则下面将**直接省略**并不再展示

## 接口分类

## 面向用户

### user/login

##### **需要的数据**

- QQ
- num（一卡通）

**返回值**

```javascript
 {
 	"message": (反馈信息),
 	"token": （前端需要的Authorization值）
 }
```

### user/get/basic

**返回值**

```javascript
"result": {
    "name": "",
    "num": "2131000004",
    "QQ": "2440004",
    "point": 0,
    "rank": 1,
    "teamname": "机器人大家庭",
    "teampoint": 0,
    "teamrank": 1
}
```

### user/get/doneList

**返回值**

```javascript
"result": [
	{
		"taskNum": "12",
		"time": "2020-02-23T15:27:56.600Z",
		"v": 3
	},
    
    {
		"taskNum": "11",
		"time": "2020-02-23T15:27:54.000Z",
		"v": 3
	}
]
```

### user/get/rankBoard

**返回值**

```javascript
"result": {
    "users": [
        {
            "QQ": "2440001",
            "num": "2131000001",
            "name": "",
            "rank": 1,
            "point": 0
        },
        
       	...........
        
        {
            "QQ": "2440009",
            "num": "2131000009",
            "name": "",
            "rank": null,
            "point": 0
        }
    ],
    "teams": [
        {
            "teamname": "机器人大家庭",
            "teamrank": 1,
            "teampoint": 0
        }
    ]
}
```

### /user/submit/joinTeam

**需要的数据**

- newteamname

### user/submit/createTeam

**需要的数据**

- newteamname

### /user/submit/updateName

**需要的数据**

- newname

### /user/sumbit/checkTask

**需要的数据**

- taskNum



## 面向管理员

- 均**需要权限**才可以访问
  - 具体判断权限暂时没有实现

### /admin/rank/update

> 更新排名的信息

**需要的数据**

- 无

### admin/team/update

> 更新队伍的数据

### admin/team/get

> 获取所有队伍数据

**返回值**

```javascript
"result": [
    {
        "_id": "5e52889c3dc7df1030e41b45",
        "teamname": "机器人大家庭",
        "member": [
            "2440001",
            "2440002",
            "2440004",
            "5e529277f839ea3f4c6a1d24"
        ],
        "teampoint": 0,
        "teamrank": 1
    }
]
```

### /admin/user/checkTask

> 核实QQ用户taskNum已经提交

**需要的数据**

- QQ
- taskNum

### admin/user/get

> 更新个人的数据

**返回值**

```javascript
"result": [
        {
            "_id": "5e528200078bc04c9409db9a",
            "QQ": "2440001",
            "num": "2131000001",
            "name": "",
            "teamname": "机器人大家庭",
            "point": 0,
            "doneList": [],
            "token": "+FJE8Sxe3ZS+3mXTD32J4A==",
            "rank": 1
        },
        {
            "_id": "5e528209078bc04c9409db9b",
            "QQ": "2440002",
            "num": "2131000002",
            "name": "",
            "teamname": "机器人大家庭",
            "point": 0,
            "doneList": [],
            "token": "Jed3co5CWhFyfamivmHE4g==",
            "rank": 1
        },
    ]
}
```



 

