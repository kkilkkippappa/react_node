const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://subin:choo2o2q1q1@practice.ok2c6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=> console.log('MongoDB Connected..'))
.catch((err) => console.log(err))

// 스키마

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})