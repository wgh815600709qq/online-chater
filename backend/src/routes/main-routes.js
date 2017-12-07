import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter({
  prefix: '/api/'
})

router
  .post('login', controllers.user.Login)
  .get('user', controllers.user.Get)
  .post('getUserInfo', controllers.user.Post)
module.exports = router
