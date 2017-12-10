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
            </div>
          </div>
          <h3>My Friends</h3>
          <div class="list-content">
            <div class="item" v-for="it in list">
              <div class="img"></div>
              <div class="disrip">
                <div>{{it.name}}</div>
                <div>【Lv {{it.level}}】</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main', // 主页入库模块
  data () {
    return {
      name: 'Mike',
      level: 0,
      list: [
        {
          name: 'John',
          level: 1
        },
        {
          name: 'Smith',
          level: 2
        },
        {
          name: 'Smith',
          level: 2
        },
        {
          name: 'Smith',
          level: 2
        },
        {
          name: 'Smith',
          level: 2
        }
      ]
    }
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
        }
        .list-content{
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          overflow-y: scroll;
          height: 370px;
          .item{
            display: flex;
            align-items: center;
            height: 120px;
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