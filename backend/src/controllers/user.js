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

export let searchById = async (ctx) => {
  var res = await user.searchById(ctx.query)
  ctx.body = res
}

export let Login = async (ctx) => {
  var res = await user.login(ctx.request.body)
  ctx.body = res
}

export let checkUserName = async (ctx) => {
  var res = await user.checkUserName(ctx.request.body)
  ctx.body = res
}

export let register = async (ctx) => {
  var res = await user.register(ctx.request.body)
  ctx.body = res
}

export let getInfo = async (ctx) => {
  var res = await user.getInfoByUsername(ctx.query)
  ctx.body = res
}
