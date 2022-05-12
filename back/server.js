const http = require('http')
const app = require('./app')
const fs = require('fs')
const path = require('path')

const normalizePort = val => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
    default:
      throw error
  }
}


const server = http.createServer((req, res)=> {
  // build file path
  const filePath = path.join(__dirname, '../', req.url === '/' ? 'index.html' : req.url)
  
  //    extension of file
  let extname = path.extname(filePath)
  
  // initial content type
  let contentType = 'text/html'
  
  // check ext and set content type
  switch(extname) {
      case '.js':
          contentType = 'text/javascript'
          break
      case '.css':
          contentType = 'text/css'
          break
      case '.json':
          contentType = 'application/json'
          break
      case '.png':
          contentType = 'image/png'
          break
      case '.jpg':
          contentType = 'image/jpg'
          break
      case '.svg':
          contentType = 'image/svg+xml'
          break
  }
  // read file
  fs.readFile(filePath, (err, content) => {
    if(err) {
        if((err.code) == 'ENOENT') {
          console.log(err)
            // page not found
            fs.readFile(path.join(__dirname, '../', '404.html'), 
            (err, content) => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(content, 'utf8')
            })
        } else {
            // some server error
            res.writeHead(500)
            res.end(`Server Error : ${err.code}`)
        }
    } else {
        // success 
        res.writeHead(200, {'Content-Type': contentType})
        res.end(content, 'utf8')
    }
  })

}) 




server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)
