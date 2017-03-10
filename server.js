// 加载依赖包
const http = require('http'),
      fs = require('fs'),
      path = require('path'),
      // 引入第三方包
      xtpl = require('xtpl'),
      // 引入音乐数据(转为了js对象)
      datas = require('./musics.json'),
      // 引入query string 模块解决 url编码问题
      querystring = require('querystring')
const server = http.createServer()
server.on('request', (req, res) => {
  let urlString = req.url
  if (urlString === '/' || urlString.includes('index.html')) {
    console.log(urlString)
    // 获取数据渲染模板页
    xtpl.renderFile(path.join(__dirname, 'index.html'), {
      musics: datas
    }, (error, data) => {
      let htmlContent = data.toString()
      // console.log(htmlContent)

      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(htmlContent)
    })
  } else if (urlString.includes('music.css')) {
    fs.readFile(path.join(__dirname, 'statics/css/music.css'), (error, data) => {
      res.setHeader('Content-Type', 'text/css;charset=utf-8')
      res.end(data.toString())
    })
  } else if (urlString.includes('jquery')) {
    fs.readFile(path.join(__dirname, 'statics/js/jquery.min.js'), (error, data) => {
      res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
      res.end(data.toString())
    })
  } else if (urlString.includes('mp3')) {
    // 解决post请求中文路径url百分比编码问题
    urlString = querystring.unescape(urlString)
    fs.readFile(path.join(__dirname, 'statics/music' + urlString), (error, data) => {

      res.setHeader('Content-Type', 'audio/mpeg;charset=utf-8')
      // 音频文件文二进制文件，不需要转成字符串格式
      res.end(data)
    })
  }
})

server.listen(5000, '127.0.0.1', (error) => {
  if (error) {
    console.log(error)
  }
  console.log('Start server OK')
})