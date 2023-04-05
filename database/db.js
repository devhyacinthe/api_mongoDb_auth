const {connect} = require('mongoose')
require('dotenv').config()

function dbConnect() {
    connect(process.env.MONGO_URI)
        .then(() => console.log(`Connexion à la base de donnée 👍 `))
        .catch(error => console.log(error))
}


module.exports = dbConnect