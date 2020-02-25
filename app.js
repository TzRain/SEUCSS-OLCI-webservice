const koa = require('koa')
const app = new koa()
const program = require('commander')
const kf = require('kf-router')
const fs = require('fs')
const chalk = require('chalk')

program
  .version('1.0.0')
  .option('-m --mode <mode>', '执行模式 <production|development|profile>')
  .option('-p, --port <port>', '监听端口（爬虫服务监听port+1000端口）', parseInt)
  .parse(process.argv)


// 将 moment 导出到全局作用域
global.moment = require('moment')
// 运行参数导出到全局
global.program = program

// 控制台输出的样式颜色
global.chalkColored = new chalk.constructor({ level: 2 })

// 解析 YAML 配置文件
const config = require('js-yaml').load(fs.readFileSync('./config.yml'))
exports.config = config


// 为 Moment 设置默认语言
moment.locale('zh-cn')

// 出错输出

process.on('unhandledRejection', e => { throw e })
process.on('uncaughtException', console.trace)


// 监听两个结束进程事件，将它们绑定至 exit 事件，有两个作用：
// 1. 使用 child_process 运行子进程时，可直接监听主进程 exit 事件来杀掉子进程；
// 2. 防止按 Ctrl+C 时程序变为后台僵尸进程。

process.on('SIGTERM', () => process.exit())
process.on('SIGINT', () => process.exit())

/**
  中间件引入
  参考 herald_webservice 的中间件层级排列
 */

/**
  ## A. 超监控层
  不受监控、不受格式变换的一些高级操作
 */
// 1. 跨域中间件，定义允许访问本服务的第三方前端页面
app.use(require('./middleware/cors'))

/**
  ## B. 监控层
  负责对服务运行状况进行监控，便于后台分析和交互，对服务本身不存在影响的中间件。
*/
// 1. 如果是生产环境，显示请求计数器；此中间件在 module load 时，会对 console 的方法做修改
app.use(require('./middleware/counter'))
// 2. 日志输出，需要依赖返回格式中间件中返回出来的 JSON 格式
app.use(require('./middleware/logger'))

/**
  ## C. 接口层
  为了方便双方通信，负责对服务收到的请求和发出的返回值做变换的中间件。
*/
// 1. 参数格式化，对上游传入的 URL 参数和请求体参数进行合并
app.use(require('./middleware/params'))
// 2. 返回格式化，将下游返回内容包装一层JSON
app.use(require('./middleware/return'))


/**
  ## F. API 层
  负责为路由处理程序提供 API 以便路由处理程序使用的中间件。
*/
// 2. 身份认证，为下面 redis 缓存提供了加解密函数
app.use(require('./middleware/auth'))
// 3. redis 缓存，为路由处理程序提供手动缓存
//（开发环境下是假 redis，不需要安装redis）
// app.use(require('./middleware/redis'))
// 4. 权限控制
// app.use(require('./middleware/permission'))
// 5. 用户信息
// app.use(require('./middleware/user'))

/**
  ## F. 路由层
  负责调用路由处理程序执行处理的中间件。
*/
app.use(kf())
app.listen(program.port)
// 开发环境下，启动 REPL
if (program.mode === 'development') {
  require('./repl').start()
}
