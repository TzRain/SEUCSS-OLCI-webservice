function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
const identity2code = {
  SUPER:0,
  XSC_LEADER: 1,
  VICE_SESRETARY: 2,
  COUNSELOR: 3,
  MONITOR: 4
}
/**
 * 权限中间件 
 */
module.exports = async (ctx, next) => {
  // 获取用户当前的权限
  ctx.permission = {
    getPermission: async () => {
      const cardnum = ctx.user.cardnum
      let permissions = await ctx.db.execute(`
        SELECT ROLE
        FROM XSC_ROLES WHERE CARDNUM = :cardnum`,
      { cardnum })
      permissions = permissions.rows.map(p => p[0])
      if(cardnum.startsWith('21')){
        permissions.push('STUDENT')
      }
      return permissions
    },
    getMaxAuthority: async()=>{
      const cardnum = ctx.user.cardnum
      let permissions = await ctx.db.execute(`
        SELECT ROLE
        FROM XSC_ROLES WHERE CARDNUM = :cardnum`,
      { cardnum })
      permissions = permissions.rows.map(p => identity2code[p[0]])
      return permissions.length === 0 ?1000:Math.min(...permissions)
    },
    checkPermission: async (permission) => {
      if (isArray(permission)) {
        // 检查权限
        const cardnum = ctx.user.cardnum
        let permissions = await ctx.db.execute(`
          SELECT ROLE
          FROM XSC_ROLES WHERE CARDNUM = :cardnum`,
        { cardnum })
        permissions = permissions.rows.map(p => p[0])
        let hasPermission = false
        permission.forEach(identity => {
          if (permissions.indexOf(identity) !== -1) {
            hasPermission = true
          }
        })
        return hasPermission
      } else {
        return (await ctx.permission.getPermission()).indexOf(permission) !== -1
      }
    },
    hasPermissionOnStudent: async (studentCardnum, permission) => {
      let adminCardnum = ctx.user.cardnum
      let adminRecord = await ctx.db.execute(`
      SELECT CLASS_ID, ROLE FROM XSC_CLASS_BIND
      WHERE ROLE != 'STUDENT' AND CARDNUM = :cardnum
      `, { cardnum: adminCardnum })
      let adminDomain = {}
      adminRecord.rows.forEach(r => {
        if (adminDomain[r[0]]) {
          adminDomain[r[0]].push(r[1])
        } else {
          adminDomain[r[0]] = [r[1]]
        }
      })
      if(adminRecord.rows.length === 0){
        return permission ? false : []
      }
      let studentRecord = await ctx.db.execute(`
      SELECT CLASS_ID FROM XSC_CLASS_BIND
      WHERE ROLE = 'STUDENT' AND CARDNUM = :cardnum
      `, { cardnum: studentCardnum })
      if (studentRecord.rows.length === 0) {
        return permission ? false : []
      } else {
        return permission ? (adminDomain[studentRecord.rows[0][0]] ? adminDomain[studentRecord.rows[0][0]].indexOf(permission) !== -1 : false ): ( adminDomain[studentRecord.rows[0][0]] ? adminDomain[studentRecord.rows[0][0]]:[])
      }
    },
    hasPermissionOnClass: async (classId, permission) => {
      let record = await ctx.db.execute(`
      SELECT ROLE FROM XSC_CLASS_BIND
      WHERE ROLE != 'STUDENT' AND CARDNUM = :cardnum AND CLASS_ID = :classId
      `, { cardnum: ctx.user.cardnum, classId })
      record = record.rows.map(r => r[0])
      if (permission) {
        return record.indexOf(permission) !== -1
      } else {
        return record
      }
    },
    hasPermissionOnWhichClass: async (permission) => {
      let record = await ctx.db.execute(`
      SELECT CLASS_ID FROM XSC_CLASS_BIND
      WHERE ROLE != 'STUDENT' AND CARDNUM = :cardnum AND ROLE = :permission
      `, { cardnum: ctx.user.cardnum, role: permission })
      return record.rows.map(r => r[0])
    },
    isStudent: async () => {
      return ctx.user.cardnum.startsWith('21')
    }
  }
  await next()
}