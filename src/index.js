const express = require('express')
const bodyParser = require('body-parser')

const Cadastro = require('./controllers/userController')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends: false}))



app.get('/', (req, res)=> {
    res.send('ok')
})

app.get('/users', Cadastro.findAll)

app.get('/user/:email', Cadastro.find)

app.put('/user/:email', Cadastro.update)

app.delete('/user/:email', Cadastro.delete)

app.post('/register', Cadastro.create)

app.listen(3000, console.log('execultando...'))