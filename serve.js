const express = require('express')
const request = require('request')
const app = express()

app.use(express.static('./'));

app.use('/', (req, res) => {
  const url = 'https://linkorg.club' + req.url
  req.pipe(request(url)).pipe(res)
})

app.listen(3000, () => {
  console.log('listen 3000')
})
