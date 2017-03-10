// 加载依赖包
const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      // 引入第三方包
      xtpl = require('xtpl'),
      // 引入音乐数据(转为了js对象)
      datas = require('./musics.json')

const server = http.createServer()
server.on('request', (req, res) => {
  const urlString = req.url
  if (urlString === '/' || urlString.includes('index.html')) {
    console.log(urlString)
    xtpl.renderFile(path.join(__dirname, 'index.html'), {
      musics: datas
    }, (error, data) => {
      let htmlContent = data.toString()
      
    })
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('Hello World')
  }
})

server.listen(5000, '127.0.0.1', (error) => {
  if (error) {
    console.log(error)
  }
  console.log('Start server OK')
})