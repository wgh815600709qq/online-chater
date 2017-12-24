import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter({
  prefix: '/api/'
})
// 免权限接口
router
  .post('login', controllers.user.Login) // 登陆
  .post('checkUserName', controllers.user.checkUserName) // 检测用户名是否重复
  .post('getUserInfo', controllers.user.Post) // 获取用户信息
  .post('register', controllers.user.register)
module.exports = router
