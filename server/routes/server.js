const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const request = require('request')
const MongoClient = require('mongodb').MongoClient;
const mongooseModel = require('../model/user')
const bcrypt = require('react-native-bcrypt')

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

app.post('/api/signup',async(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')
    const userData = req.body.newUser
    const email=userData.email
    await mongooseModel.findOne({email:email}, (err, user)=>{
        if(err){
            console.log(err.stack)
        }
        if(user){
            res.send('The email has been registered')
        }else{
            const newUser = new mongooseModel(userData)
            newUser.save(
                () => {
                    res.send('Successfully Registered')
                }
            )
        }
  })
})

app.post('/api/signin', async(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')
    const userData = req.body.oldUser
    const email = userData.email
    const password = userData.password
    await mongooseModel.findOne({email:email}, (err, user)=>{
        if(err){
            console.log(err.stack)
        }
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                res.send(user)
            }else{
                res.send('wrong password')
            }
        }else{
            res.send('invalid email')
        }
    })
})

app.post('/api/changePassword', async(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')
    const password = req.body.password
    const email = req.body.email
    if(password !== undefined && password !== ''){
        await mongooseModel.findOneAndUpdate({email:email},{password:password},{new:true},(err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        })
    }
})

app.post('/api/changeStared', async(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')
    const currencyStared = req.body.currencyStared
    const email = req.body.email
    if(currencyStared !== undefined && currencyStared !== ''){
        await mongooseModel.findOneAndUpdate({email:email},{stared:currencyStared},{new:true},(err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        })
    }
})
      
app.listen(port, () => console.log(`Listening on port ${port}`))