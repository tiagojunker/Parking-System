const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/router')

// Configurando cors
var cors = require('cors')
app.use(cors())

// Configs Body-Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', router)

app.listen(port, ()=> {
    console.log(`Servidor rodando na porta ${port}`)
})