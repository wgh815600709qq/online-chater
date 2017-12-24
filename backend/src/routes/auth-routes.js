import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

const router = new KoaRouter({
  prefix: '/auth/'
})
// 权限接口
router
  .get('searchById', controllers.user.searchById)
  .get('getRecords', controllers.records.getRecords)
  .get('getUserInfoByUsername', controllers.user.getInfo)
  .post('addFriends', controllers.relationship.addFriend)
  .post('getFriendsList', controllers.relationship.getFriendsList)
module.exports = router
