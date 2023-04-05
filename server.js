const express = require('express')
const cors =  require('cors')
require('dotenv').config()
const db = require('./database/db')
const routes = require('./routes/routes')
const app = express()
require('./middlewares/auth')


db()
app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT
app.listen(PORT, () =>console.log(`Je tourne sur le port ${PORT}`))