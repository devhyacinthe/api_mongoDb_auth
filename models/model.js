const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,  
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})





module.exports = mongoose.model('user', userSchema)