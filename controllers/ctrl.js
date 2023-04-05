const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/model')
const userValidation = require('../validation/validation')
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.signup = (req, res) => {
    // recuperer les données
    const {body} = req
    // valider les données
    const {error} = userValidation(body).userValidationSignUp
    if(error) return res.status(401).json(error.details[0].message)
    // hash du mot de passe
    bcrypt.hash(body.password, 10)
    .then( hash => {
        if(!hash) return res.status(500).json({message: "Server Error"})

        delete body.password
        new User({...body, password: hash})
        .save()
        .then((user) => {
            console.log(user);
            res.status(201).json({code: 0, message: "User Created !"})
        })
        .catch((error) => res.status(500).json({message: "User already exist", ...error}))
    }
    )
    .catch((error) => res.status(500).json(error))

    
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.signin = (req, res) => {
    const {email, password} = req.body
    //validation
    const {error} = userValidation(req.body).userValidationLogin
    if (error) return res.status(401).json(error.details[0].message)
    //trouver l'user dans la base de donnée
    User.findOne({email: email})
    .then((user) => {
        if(!user) return res.status(404).json({message: "User not found"})
        //verification du mot de passe
        bcrypt.compare(password, user.password)
        .then(match => {
            if(!match) return res.status(500).json({message: "Server Error"})
            res.status(200).json({
                code: 0,
                id: user._id,
                email: user.email,
                token: jwt.sign({id: user._id}, "SECRET_KEY", {expiresIn: "12h"})
            })
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(501).json(error))
    
}


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
exports.main = (req, res) => {
    res.send('Route protégée')
}