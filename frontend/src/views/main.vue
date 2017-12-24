<template>
  <div class="chat-list-page">
    <div class="container">
      <div class="left">
        <router-view></router-view>
      </div>
      <div class="right">
        <div class="chat-friends-list">
          <div class="list-top">
            <div class="img"></div>
            <div class="disrip">
              <div>{{name}}</div>
              <div>【Lv {{level}}】</div>
              <div class="add" @click="addFriends">+添加好友</div>
            </div>
          </div>
          <h3>My Friends  <font color="#851b25">({{total}}) </font>   </h3>
          <div class="show-window">
            <div class="list-content">
              <div class="item" v-for="it in list" @click="enterChatRoom(it)">
                <div class="img"></div>
                <div class="disrip" v-if="it.User">
                  <div>{{it.User.name}}</div>
                  <div>【Lv {{it.User.level}}】</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加框 -->
  <el-dialog title="查找用户" :visible.sync="outerVisible">
    <el-dialog
      width="35%"
      title="搜索结果"
      :visible.sync="innerVisible"
      append-to-body>
      <div>用户名：{{searchInfo.username}}</div>
      <div>昵称：{{searchInfo.name}}</div>
      <div>性别：{{searchInfo.sex ? '男' : '女'}}</div>
      <div>等级：{{searchInfo.level}}级</div>
      <div>地址：{{searchInfo.address||'暂无'}}</div>
      <el-button @click="innerVisible = false">关闭</el-button>
      <el-button type="primary" @click.native="addInstance">立即添加</el-button>
    </el-dialog>
    <el-input prefix-icon="el-icon-search" placeholder="请输入对方用户名" v-model="username" @keyup.enter.native="onSearch"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="outerVisible = false">关闭</el-button>
      <el-button type="primary" @click="onSearch">立即搜索</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'main', // 主页入库模块
  data () {
    return {
      name: 'Mike',
      level: 0,
      list: [
      ],
      outerVisible: false,
      innerVisible: false,
      username: '',
      searchInfo: {},
      total: 0// 好友总数
    }
  },
  computed: {
    ...mapGetters(['myInfo'])
  },
  methods: {
    addFriends () { // 主页按钮`添加朋友`
      this.outerVisible = true
    },
    onSearch () { // 搜索
      if (!this.username) {
        this.$message({
          type: 'error',
          message: '搜索内容不能为空'
        })
      } else {
        this.$_get('/getUserInfoByUsername', {
          username: this.username
        }).then(res => {
          if (res.data.errCode === 200) {
            this.innerVisible = true
            this.searchInfo = res.data.data
          } else if (res.data.errCode === 204) {
            this.$message({
              type: 'error',
              message: '找不到对应用户'
            })
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
      }
    },
    addInstance () { // 立即添加
      console.log('111')
      this.innerVisible = true
      console.log(this.myInfo)
      if (this.username === this.myInfo.username) {
        this.$message({
          type: 'error',
          message: '不能添加自己'
        })
      } else {
        this.$_post('addFriends', {
          userId: this.myInfo.id,
          friendId: this.searchInfo.id
        }).then(res => {
          console.log('res', res)
          if (res.data.errCode === '200') {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          } else {
            debugger
            this.$message.error(res.data.errMsg)
          }
        }).catch(err => {
          console.log('err', err)
        })
      }
    },
    getFriendsList () { // 获取好友列表
      this.$_post('getFriendsList', {
        userId: this.myInfo.id
      }).then(res => {
        console.log('res', res)
        if (res.data.errCode === '200') {
          this.list = res.data.errMsg.list
          this.total = res.data.errMsg.total
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    enterChatRoom (it) { // 进入聊天室
      if (it.friendId === this.myInfo.id) {
        this.$router.push({path: '/main/chat-room', query: {uid: this.myInfo.id, fid: it.userId}})
      } else {
        this.$router.push({path: '/main/chat-room', query: {uid: this.myInfo.id, fid: it.friendId}})
      }
    }
  },
  created () {
    this.getFriendsList()
    this.name = this.myInfo.name
    this.level = this.myInfo.level
  }
}
</script>

<style lang="less" scoped>
.chat-list-page{
  padding:100px;
  height: 100%;
  .container{
    width: 100%;
    height: 600px;
    border-radius: 15px;
    display: flex;
    .left{
      flex:1;
      border-radius: 15px;
      // background: blue;
      border: 1px solid red;
    }
    .right{
      flex-basis: 300px;
      margin-left: 5px;
      // background-color: red;
      border: 1px solid blue;
      border-radius: 15px;
      .chat-friends-list{
        .list-top{
          display: flex;
          align-items: center;
          border-bottom:1px solid #999;
          .add{
            border: 1px solid #851b25;
            cursor: pointer;
            border-radius: 5px;
            width: 100px;
            text-align: center;
            padding: 2px;
          }
        }
        .show-window{
          width: 300px;
          height: 415px;
          border-radius: 15px;
          overflow-y: scroll;
        }
        .list-content{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          .item{
            margin: 10px 0;
            display: flex;
            align-items: center;
            height: 130px;
            border-bottom:1px solid #999;
          }
        }
        .img{
          width: 80px;
          height: 80px;
          margin:20px;
          border-radius: 50%;
          border: 1px solid #999;
        }
        .disrip{
          flex:1;
          text-align: left;
        }
      }
      .list-content{
        border-top:1px solid #999;
      }
    }
  }
}
</style>