const {connect} = require('mongoose')


function dbConnect() {
    connect("mongodb+srv://devhyacinthe:dhjunior2002@cluster0.uwvdk.mongodb.net/test")
        .then(() => console.log("Connexion à la base de donnée 👍"))
        .catch(error => console.log(error))
}


module.exports = dbConnect