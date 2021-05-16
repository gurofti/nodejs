const jwt = require('jsonwebtoken')
const User = require("../models/users");

const requiredAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'gizli kelime', (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'gizli kelime', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.locals.user = null
            } else {
                console.log(decodedToken)
                res.locals.user = await User.findById(decodedToken.id)
            }
        })
    } else {
        res.redirect('/login')
    }
}

module.exports = {requiredAuth, checkUser}
