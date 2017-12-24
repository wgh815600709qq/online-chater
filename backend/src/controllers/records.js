import talkRecords from '../models/talk-records.js'

export let getRecords = async (ctx) => {
  var res = await talkRecords.getRecords(ctx.query)
  ctx.body = res
}
