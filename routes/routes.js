const {Router} = require('express')
const express = require('express')
const {signin, signup, main} = require('../controllers/ctrl')
const router = Router()

const passport = require('passport')

router.post('/signup', signup)
router.post('/signin', signin)

router.use(passport.authenticate('jwt', {session: false}))
router.get('/main', main)

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
router.get('/', (req, res) => {
    res.send('hello')
})

module.exports = router
