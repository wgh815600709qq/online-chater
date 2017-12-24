// 分割
import db from '../config/db.js'
const talkRecordsSchema = '../schema/talking-records.js'
const DB = db.lkDatabase // 引入数据库
const TalkRecords = DB.import(talkRecordsSchema)
// import PluginLoader from './lib/PluginLoader'
var express = require('express')
var expressApp = express()
var expressServer = require('http').Server(expressApp)
var io = require('socket.io').listen(expressServer)
io.on('connection', function (socket) {
  socket.emit('connected', { message: 'I Am Working!!' })
  socket.on('singleRoom', async (data) => { // 单人聊天
    console.log('data', data)
    await TalkRecords.create({
      speak_id: data.uid,
      grounp_ids: [data.uid, data.fid] + '',
      content: data.content
    })
    socket.broadcast.emit('msg-stored')
  })
})
expressServer.listen(3333)
console.warn('Socket server start on 3333')
