/*
* @数据库连接文件
*/

import Sequelize from 'sequelize'
import { DB as Config } from './config'
const lkDatabase = new Sequelize(Config.database, Config.username, Config.password, {
  host: Config.host,
  port: Config.port,
  dialect: Config.dialect,
  dialectOptions: { // MySQL > 5.5，其它数据库删除此项
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_520_ci',
    // socketPath: '/var/run/mysqld/mysqld.sock', // 应用和数据同一服务器可开启
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  define: {
    timestamps: true, // 自动给数据表加入时间戳（createdAt以及updatedAt）
    underscored: false // 不用驼峰命名时间字段  (created_at以及updated_at）
  },
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' // 东八时区
})

export default {
  lkDatabase // 将lkDatabase暴露出接口方便 Model调用
}
