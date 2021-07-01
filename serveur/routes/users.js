const express = require('express')
const sql = require('mysql')
const router = express.Router()

let con = sql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: 8889,
    password: "root",
    //port: 3306,
    //password: "",
    database: "b3csia"
});

let isLoged = function (mail, mdp) {
    return "SELECT utilisateur.utilisateur_id as loged FROM utilisateur WHERE utilisateur.mail = '" + mail + "' and utilisateur.mdp = '" + mdp + "'"
}

router.get('/login/:mail/:password', function (req, res, next) {
    let mail = req.params.mail
    let password = req.params.password
    con.query(isLoged(mail, password), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
});


module.exports = router;
