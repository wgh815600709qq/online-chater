<template>
	<div class="login-page">
		<div class="container">
			<h3>Online-Chat-System</h3>
			<div class="form">
				<div class="item">
					<div class="left">Username</div>
					<div class="right"><input type="text" v-model="username" placeholder="Input your username"></div>
				</div>
				<div class="item">
					<div class="left">Password</div>
					<div class="right"><input type="password" v-model="password" placeholder="Inut your password"></div>
				</div>
				<div class="item">
					<div class="left">Verification</div>
					<div class="right"><input class="verification" type="text" v-model="verification" placeholder="Input verification"><span class="get-code">{{getCode}}</span></div>
				</div>
			</div>
      <div style="display:flex">
        <div class="btn" @click="login">Login Now.</div>
        <div class="btn" @click="register">Register Now.</div>
      </div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      verification: '',
      getCode: '3696'
    }
  },
  methods: {
    login () {
      let err = this.check()
      if (err) {
        this.$notify.error({
          title: 'Error',
          message: err
        })
      } else {
        this.$post('/login', {
          username: this.username,
          password: this.utils.md5Encrypt(this.password)
        }).then(res => {
          if (res.data.success) {
            window.lockr.set('token', res.data.token)
            window.lockr.set('userInfo', res.data.info)
          }
        }).catch(err => {
          console.log('err', err)
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
      if (!this.verification) {
        err = 'Verification cannot be null'
        return err
      }
      if (this.verification !== this.getCode) {
        err = 'Verification isnot true'
        return err
      }
    },
    register () { // 注册
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style lang="less" scoped>
.login-page{
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: pink;
	.container{
		width: 500px;
		height: 400px;
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

</style>