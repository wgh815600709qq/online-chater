import db from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))
const userSchema = '../schema/user.js'
const DB = db.lkDatabase // 引入数据库
const User = DB.import(userSchema) // 用sequelize的import方法引入表结构，实例化了admin

// 查询
const search = async (params) => {
  const rdata = await User.findAll()
  return rdata // 返回数据
}

const login = async (params) => {
  const res = await User.findOne({where: {username: params.username}})
  // var password = bcrypt.hashSync(params.password, 8)
  console.log(bcrypt.compareSync(params.password, res.password))
  if (res && bcrypt.compareSync(params.password, res.password)) {
    var token = jwt.sign({username: params.username, password: params.password}, publicKey)
    delete res.password
    return {
      success: true,
      token: token,
      info: res,
      errCode: 200,
      errMsg: '登陆成功'
    }
  } else {
    return {
      success: false,
      errCode: 201,
      errMsg: '登陆失败'
    }
  }
}

export default {
  search,
  login
}
