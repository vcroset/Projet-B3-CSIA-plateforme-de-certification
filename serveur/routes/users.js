const express = require('express')
const router = express.Router()

const users = require('../localData/user')

function validateLogin(req, res, state) {
    if (!req.body || !req.body.mail || !req.body.password) {
        return res.json("no")
    }
    let mail = req.body.mail
    let password = req.body.password
    let user = users.filter(e => e.mail == mail && e.state == state)
    if (user) {
        user = user[0]
    }
    if (user && user.password == password) {
        res.json("ok")
    } else {
        res.json("no")
    }
}

router.get("/login", function (req, res,  next) {
    res.json("ok")
})

// POST /users/coach/login
router.post('/coach/login', function (req, res, next) {
    validateLogin(req, res, "coach")
});

// POST /users/responsable/login
router.post('/responsable/login', function (req, res, next) {
    validateLogin(req, res, "responsable")
});


module.exports = router;
