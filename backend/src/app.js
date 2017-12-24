import Koa2 from 'koa'
import KoaBody from 'koa-body'
import cors from 'koa-cors'
import KoaStatic from 'koa-static2'
import {
  System as SystemConfig
} from './config/config.js'
import path from 'path'
import AuthRoutes from './routes/auth-routes.js'
import MainRoutes from './routes/main-routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import jwt from 'koa-jwt'
import fs from 'fs'
import './middleware/talkSolvetion.js'
const app = new Koa2()

const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))
app
  .use(cors())
  .use((ctx, next) => {
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/user\/login|\/api|\/assets/] }))
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(MainRoutes.routes())
  .use(MainRoutes.allowedMethods())
  .use(AuthRoutes.routes())
  .use(AuthRoutes.allowedMethods())
  .use(ErrorRoutes())

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}
app.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
