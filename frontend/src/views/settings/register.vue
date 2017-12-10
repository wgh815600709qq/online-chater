<template>
  <div class="register-page">
    <div class="container">
      <h3>Register For Online-Chat-System</h3>
      <div class="form">
        <div class="item"><span class="star">*</span>
          <div class="left">Username</div>
          <div class="right"><input type="text" v-model="username"  @blur="checkRepeat" placeholder="Input your username"></div>
        </div>
        <div class="item"><span class="star">*</span>
          <div class="left">Password</div>
          <div class="right"><input type="password" v-model="password" placeholder="Inut your password"></div>
        </div>
        <div class="item"><span class="star">*</span>
          <div class="left">Repeat</div>
          <div class="right"><input type="password" v-model="rePassword" placeholder="Repeat your password"></div>
        </div>
        <div class="item"><span class="star">*</span>
          <div class="left">Name</div>
          <div class="right"><input class="name" type="text" v-model="name" placeholder="Input name"></div>
        </div>
        <div class="item"><span class="star">*</span>
          <div class="left">Sex</div>
          <div class="right">
            <el-radio v-model="sex" label="1">男</el-radio>
            <el-radio v-model="sex" label="0">女</el-radio></el-input>
          </div>
        </div>
        <div class="item">
          <div class="left">Address</div>
          <div class="right"><el-input class="address" type="textarea" v-model="address" placeholder="Input your address"></el-input></div>
        </div>
      </div>
      <div style="display:flex">
        <el-button class="btn" type="large" @click="register">Register</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      rePassword: '',
      name: '',
      sex: '1',
      address: '',
      error: ''
    }
  },
  methods: {
    register () { // 注册
      var err = this.check()
      if (err) {
        this.$notify.error({
          title: 'Error',
          message: err
        })
      } else if (this.error) {
        this.$notify.error({
          title: 'Error',
          message: this.error
        })
      } else {
        this.$post('register', {
          username: this.username,
          password: this.utils.md5Encrypt(this.password),
          name: this.name,
          sex: this.sex,
          address: this.address
        }).then(res => {
          if (res.data.success) {
            this.$notify.success({
              title: 'Success Register',
              message: res.data.errMsg
            })
          }
        })
      }
    },
    check () {
      var err
      if (!this.username) {
        err = 'Username cannot be null'
        return err
      }
      if (!this.password) {
        err = 'Password cannot be null'
        return err
      }
      if (this.password !== this.rePassword) {
        err = 'Twice input of password should be the same'
        return err
      }
      if (!this.name) {
        err = 'Name cannot be null'
        return err
      }
      if (!this.sex) {
        err = 'Sex cannot be null'
        return err
      }
    },
    checkRepeat () { // 判断用户名是否重复
      if (!this.username) return
      this.$post('checkUserName', {
        username: this.username
      }).then(res => {
        if (res.data.success) {
          this.$notify.success({
            title: 'Correct Operation',
            message: res.data.errMsg
          })
          this.error = null
        } else {
          this.$notify.error({
            title: 'Error',
            message: res.data.errMsg
          })
          this.error = res.data.errMsg
        }
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register-page{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: pink;
  .container{
    width: 500px;
    height: 600px;
    border-radius: 10px;
    background-color: #fff;
    .item{
      display: flex;
      align-items: center;
      height: 50px;
      margin: 30px 30px 0 30px;
      input{
        outline: none;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 200px;
        height: 30px;
        text-indent: 10px;
      }
      .left{
        flex-basis: 100px;
      }
      .right{
        display: flex;
        align-items: center;
        .get-code{
          margin-left:10px;
          border: 1px solid #ccc;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
        }
        .verification{
          width: 140px;
        }
      }
    }
    .btn{
      margin: 20px auto;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #333;
      width: 100px;
    }
  }
}
.star{
  color:red;
}
</style>