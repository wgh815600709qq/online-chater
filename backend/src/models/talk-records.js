import db from '../config/db.js'
const recordsSchema = '../schema/talking-records.js'
const DB = db.lkDatabase // 引入数据库
const TalkRecords = DB.import(recordsSchema) // 用sequelize的import方法引入表结构，实例化了admin
const userSchema = '../schema/user.js'
const User = DB.import(userSchema)
User.hasMany(TalkRecords, {foreignKey: 'speak_id'})
TalkRecords.belongsTo(User, {foreignKey: 'speak_id'})
// 查询
const getRecords = async (params) => {
  console.log('`````````````params', params)
  const res1 = await TalkRecords.findAndCountAll({
    include: [{model: User}],
    where: {
      speak_id: params.uid,
      $and: {
        grounp_ids: [params.uid, params.fid] + ''
      }
    }
  })
  const res2 = await TalkRecords.findAndCountAll({
    include: [{model: User}],
    where: {
      speak_id: params.fid,
      $and: {
        grounp_ids: [params.fid, params.uid] + ''
      }
    }
  })
  var res
  if (res1.count && res2.count) {
    res = {
      count: res1.count + res2.count,
      rows: res1.rows.concat(res2.rows)
    }
  } else if (res1.count && !res2.count) {
    res = res1
  } else if (!res1.count && res2.count) {
    res = res2
  }
  res.rows.sort(sortByTime)
  if (res.count) {
    return {
      errCode: '200',
      errMsg: {
        list: res.rows,
        total: res.count
      }
    }
  } else {
    return {
      errCode: '204',
      errMsg: 'not found'
    }
  }
}

function sortByTime (a, b) {
  return a.createdAt - b.createdAt
}

export default {
  getRecords
}
