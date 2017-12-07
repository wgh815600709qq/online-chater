import user from '../models/user.js'

export let Post = async (ctx) => {
  console.log('进入')
  ctx.body = {
    method: 'post',
    errCode: 200,
    errMsg: '成功',
    data1: ctx.request.body
  }
}

export let Get = async (ctx) => {
  console.log('进入get')
  var res = await user.search()
  ctx.body = {
    method: 'get',
    data: res,
    errCode: 200,
    errMsg: '成功'
  }
}

export let Login = async (ctx) => {
  var res = await user.login(ctx.request.body)
  ctx.body = res
}
