const {Router} = require('express')
const {signin, signup, main} = require('../controllers/ctrl')
const router = Router()

const passport = require('passport')

router.post('/api/signup', signup)
router.post('/api/signin', signin)

router.use(passport.authenticate('jwt', {session: false}))
router.get('/main', main)



module.exports = router
