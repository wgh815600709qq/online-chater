import db from '../config/db.js'
const relationSchema = '../schema/relationship.js'
const userSchema = '../schema/user.js'
const DB = db.lkDatabase // 引入数据库
const Relation = DB.import(relationSchema) // 用sequelize的import方法引入表结构，实例化了admin
const Us = DB.import(userSchema)
// 建立好友关系
const addFriend = async (params) => {
  const uid = params.userId
  const fid = params.friendId
  const res = await Relation.findOne(
    {
      where: {
        userId: uid,
        $and: {
          friendId: fid
        }
      },
      $or: {
        where: {
          userId: fid,
          $and: {
            friendId: uid
          }
        }
      }
    }
  )
  if (res) {
    return {
      errCode: '202',
      errMsg: '您添加的对方已经是您的好友，无需再次添加'
    }
  } else {
    let response = await Relation.create({
      userId: uid,
      friendId: fid
    })
    return {
      errCode: '200',
      errMsg: response
    }
  }
}

const getFriendsList = async (params) => {
  Us.hasMany(Relation, {foreignKey: 'friendId'})
  Relation.belongsTo(Us, {foreignKey: 'friendId'})
  var uid = params.userId
  var res1 = await Relation.findAndCountAll(
    {
      include: [{model: Us, attributes: ['name', 'level', 'id']}],
      attributes: ['id', 'userId', 'friendId'],
      where: {
        userId: uid
      }
    }
  )
  Us.hasMany(Relation, {foreignKey: 'userId'})
  Relation.belongsTo(Us, {foreignKey: 'userId'})
  var res2 = await Relation.findAndCountAll({
    include: [{model: Us, attributes: ['name', 'level', 'id']}],
    attributes: ['id', 'userId', 'friendId'],
    where: {
      friendId: uid
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
  if (res) {
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
      errMsg: '暂无好友'
    }
  }
}

export default {
  addFriend,
  getFriendsList
}
