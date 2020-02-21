# seu生学部2020春季线上打卡小活动 

 接口| 类型| 权限 | 功能 | 需要参数 |返回类型|备注
 -|-|-|-|-| -| -
 /admin/point/update |GET|是|人工加分|QQ<br />value:需要加的分值||-
 /admin/task/init |GET|是|初始化任务数据|-||-
 /rank/get |GET|否|得到排行榜数据|-|[{<br />name：昵称,<br />rating：积分<br />}]|-
 /user/get/basic |GET|否|更新并获取用户数据|-|{<br />id:<br />QQ:QQ号, <br />name:昵称,<br />teamname:队伍名称,<br />rating:积分,<br />card:卡片获得情况,<br />[{<br />time:任务完成时间<br />taskNum:任务编号<br />}]<br />time:上次登陆的时间<br />[今天完成的任务编号]<br />}|-
 /user/sumbit/checkTask |GET|否|提交打卡|taskNum|-|-
 /user/sumbit/register |GET|否|注册|QQ,<br />name, <br />teamname = ""|-|-
 /user/sumbit/update |GET|否|修改用户昵称|name = ""|-|-

 

