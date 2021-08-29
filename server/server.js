const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
// const helmet = require('helmet')
const path = require('path')

const routes = require('../routes')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000


// app.use('/heartbeat', (req,res) => res.send("I am fine, Thank you!"))

// app.use(cors({
//   "origin": "*",
//   "methods": "GET,POST,OPTIONS,PUT,DELETE,PATCH,HEAD",
//   "preflightContinue": "false",
//   "optionsSuccessStatus": 204
// }))

app.prepare().then(() => {
    const server = express()

    //server.use(helmet())
    server.use(compression())

    server.use('/assets/locales', express.static(path.join(__dirname, '/assets/locales')))
    server.get('*', (req,res) => {
      return handler(req,res)
    })

    // server.get('/about', (req,res) => {
    //   const actualPage = '/about'
    //   app.render(req,res, actualPage, req.query)
    // })

    server.listen(port, (error) => {
      if (error) throw error
      console.info(`Running on http://localhost:${port}`)
    })

    return server
}).catch((e) => {
  console.error(e.stack)
  throw e.stack
})

module.exports = app