const express = require('express')
const bodyParser = require('body-parser')

const userRoute = require('./routes/userRoute') //importar rota

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false})) //transformar o dado do post em um objeto

userRoute(app)//passada como dependencia para essa rota. Do GET

app.get('/', (req, res) => res.send('Olá mundo pelo express'))//metodo http que vai testar

app.listen(port, () => console.log('Api rodando na porta 3000')) //um calback