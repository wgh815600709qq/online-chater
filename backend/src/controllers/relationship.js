import relationship from '../models/relationship.js'

export let addFriend = async (ctx) => {
  var res = await relationship.addFriend(ctx.request.body)
  ctx.body = res
}

export let getFriendsList = async (ctx) => {
  var res = await relationship.getFriendsList(ctx.request.body)
  ctx.body = res
}
