module.exports = async (ctx, next) => {
  ctx.getUserInfo = async (cardnum) => {
    let name, schoolnum
    if (cardnum.startsWith('21')) {
      // 本科生库
      const record = await ctx.db.execute(
        `SELECT XM, XJH FROM T_BZKS_TMP
        WHERE XH=:cardnum`, [cardnum]
      )
      if (record.rows.length > 0) {
        name = record.rows[0][0]
        schoolnum = record.rows[0][1]
      }
    }  else if (cardnum.startsWith('10')) {
      // 教职工库
      const record = await ctx.db.execute(
        `SELECT XM FROM T_JZG_JBXX_TMP
        WHERE ZGH=:cardnum`, [cardnum]
      )
      if (record.rows.length > 0) {
        name = record.rows[0][0]
      }
    }
    return { name, schoolnum }
  }
  await next()
}