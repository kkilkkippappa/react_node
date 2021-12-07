const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyparser = require('body-parser');

const {User} = require('./models/User');

const config = require('./config/key');

// application/x-www-form-urlencoded 형태 분석
app.use(bodyparser.urlencoded({extended: true}));

// application/json 분석
app.use(bodyparser.json());

mongoose.connect(config.mongoURL, {})
.then(()=> console.log('MongoDB Connected..'))
.catch((err) => console.log(err))

// 스키마

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 회원가입
app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 cliendt에서 가져오면
  // 그것들을 데이터베이스에 삽입한다.

  const user = new User(req.body) // json 파일로 저장되어있음.

  // user 모델에 정보 저장
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})