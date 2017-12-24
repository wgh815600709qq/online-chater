<template>
  <div class="chat-room">
    <!-- 标题 -->
    <h3 v-if="uInfo && fInfo">{{uInfo.name}}发起与{{fInfo.name}}的聊天</h3>
    <!-- 对话记录 -->
    <div class="records">
      <div v-for="item in recordsList">
        {{item.User.name}}说: {{item.content}}
        <span>{{utils.parseTime(item.createdAt)}}</span>
      </div>
    </div>
    <!-- 新的对话 -->
    <div class="new-talking">
      <textarea v-model="content"></textarea>
    </div>
    <div>
      <el-button @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat-room',
  data () {
    return {
      uid: '',
      fid: '',
      uInfo: null,
      fInfo: null,
      recordsList: [],
      content: ''
    }
  },
  methods: {
    sendMsg () {
      if (!this.content) return
      var socket = io.connect('http://localhost:3333')
      socket.on('connected', (data) => {
        console.log('data', data)
        socket.emit('singleRoom', {'uid': this.uid, 'fid': this.fid, 'content': this.content})
      })
    },
    getRecords () {
      this.$_get('getRecords', {uid: this.uid, fid: this.fid}).then(res => {
        if (res.data.errCode === '200') {
          this.recordsList = res.data.errMsg.list
        }
      })
    },
    getInfoById () {
      this.$_get('searchById', {id: this.uid}).then(res => {
        if (res.data.errCode === '200') {
          this.uInfo = res.data.errMsg
        }
      })
      this.$_get('searchById', {id: this.fid}).then(res => {
        if (res.data.errCode === '200') {
          this.fInfo = res.data.errMsg
        }
      })
    }
  },
/* global io */
  created () {
    this.uid = this.$route.query.uid
    this.fid = this.$route.query.fid
    this.getInfoById()
    this.getRecords()
    var socket = io.connect('http://localhost:3333')
    socket.on('connected', (data) => {
      socket.on('msg-stored', () => {
        console.log('我听到了')
        this.getRecords()
      })
    })
  }
}
</script>

<style lang="less" scoped>
.records{
  height: 280px;
  overflow-y:scroll;
}
.new-talking{
  border-top: 1px solid #eee;
  textarea{
    width: 98%;
    height: 180px;
  }
}
</style>