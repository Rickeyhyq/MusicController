// 加载依赖包
const express = require('express'),
  fs = require('fs'),
  path = require('path'),
  // 引入第三方包
  xtpl = require('xtpl'),
  // 引入音乐数据(转为了js对象)
  datas = require('./musics.json'),
  // 引入query string 模块解决 url编码问题
  querystring = require('querystring'),
  app = express(),
  router = express.Router()

app.use(express.static(path.join(__dirname, 'statics')))

// app.use('/music', router)

const deal = (req, res) => {
  xtpl.renderFile(path.join(__dirname, 'index.html'), { musics: datas }, (err, content) => {
    res.send(content);
  })
}

app.all('/', (req, res, next) => {
  deal(req, res)
})

app.get('/index.html', (req, res) => {
  deal(req, res)
})

app.listen(7000, '127.0.0.1', (error) => {
  if (error) {
    console.log(error)
  }
  console.log('Start server OK')
})