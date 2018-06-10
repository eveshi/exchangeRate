const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
console.log('PORT:', process.env.PORT)
const port = process.env.PORT || 5000
app.use(express.static(path.join(__dirname, '../../build')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

const changeRatesUrl = 'https://openexchangerates.org/api/'
const changeRateUser = '1983105210844c4e8e40c9294f33d1f7'

app.post('/api/getCurrency', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  let currency = {}
  request(changeRatesUrl+'currencies.json', (err, r, data)=> {
    if(err){
      console.log(err.stack)
    }
    
    currency = data
    res.send(currency)
  })
})

app.post('/api/getCurrentExchangeRate', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  let exchangeRate = {}
  request(changeRatesUrl+'latest.json?app_id='+changeRateUser, (err, r, data) => {
    if(err){
      console.log(err.stack)
    }
    
    exchangeRate = JSON.parse(data).rates
    let fixedChangeRate = {}
    Object.keys(exchangeRate).map((key) => {
      const item = {[key]: exchangeRate[key].toFixed(2)}
      fixedChangeRate = {
        ...fixedChangeRate,
        ...item}
    })
    console.log(fixedChangeRate)
    res.send(fixedChangeRate)
  })
})

app.post('/api/getHistoryExchangeRate', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  const date = req.body.date
  console.log(date)
  let exchangeRate = {}
  request(changeRatesUrl+'historical/'+date+'.json?app_id='+changeRateUser, (err, r, data) => {
    if(err){
      console.log(err.stack)
    }

    exchangeRate = JSON.parse(data).rates
    let fixedChangeRate = {}
    Object.keys(exchangeRate).map((key) => {
      const item = {[key]: exchangeRate[key].toFixed(2)}
      fixedChangeRate = {
        ...fixedChangeRate,
        ...item}
    })
    console.log(fixedChangeRate)
    res.send(fixedChangeRate)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`))