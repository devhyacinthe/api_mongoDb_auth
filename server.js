const express = require('express')
const cors =  require('cors')
const db = require('./database/db')
const routes = require('./routes/routes')
const app = express()
require('./middlewares/auth')


db()
app.use(cors())
app.use(express.json())
app.use(routes)
app.listen(8080, () =>console.log("Je tourne sur le port 8080"))