const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// axios


const bcrypt = require('react-native-bcrypt')

const app = express()

const port = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../../build')))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

// CHANGE_RATE_URL
const changeRatesUrl = 'https://openexchangerates.org/api/'
const changeRateUser = '1983105210844c4e8e40c9294f33d1f7'

apiRoutes.get('/currency', (req, res) => {

  request(changeRatesUrl+'currencies.json', (err, r, data)=> {
    if(err){
      console.log(err.stack)
    }
    
    res.send(data)
  })
})

apiRoutes.get('/current-exchange-rate', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  let exchangeRate = {}
  request(`${changeRatesUrl}latest.json?app_id=${changeRateUser}`, (err, r, data) => {
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

apiRoutes.post('/getHistoryExchangeRate', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', 'true')
  const date = req.body.date
  console.log(date)
  
  request(changeRatesUrl+'historical/'+date+'.json?app_id='+changeRateUser, (err, r, data) => {
    if(err){
      console.log(err.stack)
    }

    const exchangeRate = JSON.parse(data).rates
    
    const fixedChangeRate = Object.keys(exchangeRate).reduce((acc, currency) => {
      return {
        ...acc,
        [currency]: exchangeRate[currency].toFixed(2)
    }
    }, {});
    res.send(fixedChangeRate)
  })
})

apiRoutes.post('/signup', async (req,res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')

    try {
        const {newUser} = req.body;
        const email=newUser.email;

        const user = await mongooseModel.findOne({email:email});

        if(user){
            res.send('The email has been registered')
            return;
        }
    
        await mongooseModel.create(newUser)
        res.send('Successfully Registered')
    } catch (err) {
        next(err);
        return;
    }
})

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
})

apiRoutes.post('/signin', async(req,res, next) => {

    try {
        if(!req.body.oldUser){
            throw new Error('400')
        }
    
        const userData = req.body.oldUser
        const email = userData.email
        const password = userData.password

        const user = await mongooseModel.findOne({email:email});

        if (!user) {
            // TODO: error
            res.send('invalid email');
            return;
        }
    
        if(!bcrypt.compareSync(password, user.password)){
            // TODO: error
            res.send('wrong password')
            return;
        }
    
        res.send(user)
        return;
        
    } catch (error) {

        next(error)
        
    }
})

apiRoutes.post('/change-password', async(req,res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', 'true')
    const password = req.body.password
    const email = req.body.email
    if(password){
        await mongooseModel.findOneAndUpdate(
            {email:email},
            {password:password},
            {new:true},
            (err,user) => {
            if(err){
                console.log(err.stack)
                res.send('fail')
            }
            res.send(user)
        })
    }
})

apiRoutes.patch('/users/:user_id', async(req,res) => {
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

app.use('/api', apiRoutes);

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.send({
        code: 'InvalidRequest',
        message: 'adi!'
    })
});
