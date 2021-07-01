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

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // DEV ONLY
    /**
     con.query(getAllFormation(), function (err, result) {
        if (err) throw err;
        console.log("getAllFormation: ", result);
    });
     con.query(getCoachForStudentWhereFormation(2), function (err, result) {
        if (err) throw err;
        console.log("getCoachForStudentWhereFormation: ", result);
    });
     con.query(getDatesOfFormation(2), function (err, result) {
        if (err) throw err;
        console.log("getDatesOfFormation: ", result);
    });
     con.query(getPresentStudentOnFormation(2), function (err, result) {
        if (err) throw err;
        console.log("getPresentStudentOnFormation: ", result);
    });*/
});

let getIntervantFormation = function (formation_id) {
    return "SELECT u.prenom as intervenantPrenom, u.nom as intervenantNom, animer_formation.date FROM animer_formation  LEFT JOIN intervenant i ON i.intervenant_id = animer_formation.intervenant_id LEFT JOIN utilisateur u ON u.utilisateur_id = i.utilisateur_id WHERE animer_formation.formation_id = " + formation_id
}

let getAllFormation = function () {
    return "SELECT formation.titre,formation.formation_id as formationId, u.prenom as responsablePrenom, u.mail as responsableMail, u.nom as responsableNom FROM formation  LEFT JOIN responsable r on r.responsable_id = formation.responsable_id LEFT JOIN utilisateur u on u.utilisateur_id = r.utilisateur_id"
}

let getCoachForStudentWhereFormation = function (formation_id) {
    return "SELECT u.prenom as coachPrenom, u.nom as coachNom, e.prenom as elevePrenom, e.nom as eleveNom FROM assiter_formation  LEFT JOIN coach c ON c.coach_id = assiter_formation.coach_id LEFT JOIN utilisateur u ON u.utilisateur_id = c.utilisateur_id LEFT JOIN eleve e ON e.eleve_id = assiter_formation.eleve_id WHERE assiter_formation.formation_id =" + formation_id
}

let getDatesOfFormation = function (formation_id) {
    return "SELECT animer_formation.date FROM animer_formation WHERE animer_formation.formation_id = " + formation_id
}

let getPresentStudentOnFormation = function (formation_id) {
    return "SELECT e.nom as eleveNom, e.prenom as elevePrenom, present_formation.present as present, af.date as dateFormation, ui.nom as intervenantNom, ui.prenom as intervenantPrenom, f.titre as formationTitre FROM present_formation JOIN animer_formation af ON af.animer_formation_id = present_formation.animer_formation_id LEFT JOIN eleve e ON e.eleve_id = present_formation.eleve_id LEFT JOIN intervenant i ON i.intervenant_id = af.intervenant_id LEFT JOIN utilisateur ui ON i.utilisateur_id = ui.utilisateur_id LEFT JOIN formation f ON f.formation_id = af.formation_id WHERE af.formation_id = " + formation_id
}

let getPerm = function (mail) {
    return "SELECT c.coach_id as isCoach,r.responsable_id as isResponsable,i.intervenant_id as isIntervenant FROM utilisateur LEFT JOIN coach c ON c.utilisateur_id = utilisateur.utilisateur_id LEFT JOIN responsable r ON r.utilisateur_id = utilisateur.utilisateur_id LEFT JOIN intervenant i ON i.utilisateur_id = utilisateur.utilisateur_id WHERE utilisateur.mail = '" + mail + "'"
}

// formation/
router.get('/', function (req, res, next) {
    con.query(getAllFormation(), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

// formation/{id}/internevant
router.get("/:id/intervenant", function (req, res, next) {
    let id = req.params.id
    if (!id) {
        res.json('ko')
    }
    con.query(getIntervantFormation(id), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

//  /formation/{id}/coach
router.get('/:id/coach', function (req, res, next) {
    let id = req.params.id
    if (!id) {
        res.json('ko')
    }
    con.query(getCoachForStudentWhereFormation(id), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

// formation/{id}/dates
router.get('/:id/dates', function (req, res, next) {
    let id = req.params.id
    if (!id) {
        res.json('ko')
    }
    con.query(getDatesOfFormation(id), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.get('/:id/fichepresent', function (req, res, next) {
    let id = req.params.id
    if (!id) {
        res.json('ko')
    }
    con.query(getPresentStudentOnFormation(id), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.get('/user/:mail', function (req, res, next) {
    let id = req.params.mail
    if (!id) {
        res.json('ko')
    }
    con.query(getPerm(id), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})


/**
 *
 *  V2
 *
 *
 */

router.get('/v2/', function (req, res, next) {
    con.query('SELECT * FROM formation where formation.supprime = 0', function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.get('/v2/prof', function (req, res, next) {
    con.query('SELECT intervenant.intervenant_id, u.nom, u.prenom, af.date_intervention AS dateOccupe FROM intervenant JOIN utilisateur u ON u.utilisateur_id = intervenant.utilisateur_id LEFT JOIN animer_formation af ON af.intervenant_id = intervenant.intervenant_id ', function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.get('/v2/:id/remove', function (req, res, next) {
    con.query('UPDATE `formation` SET `supprime`=1 WHERE formation.formation_id = ' + req.params.id, function (err, result) {
        if (err) throw err;
        res.json("ok")
    });
})

router.get('/v2/addDate/:idformation/:mailresponsable/:idintervenant/:date', function (req, res, next) {
    let idFormation = req.params.idformation
    let mailResponsable = req.params.mailresponsable
    let idIntervenant = req.params.idintervenant
    let date = req.params.date
    con.query("INSERT INTO `animer_formation`(`responsable_id`, `intervenant_id`, `formation_id`, `date_intervention`) VALUES ((SELECT responsable_id FROM responsable JOIN utilisateur u ON responsable.utilisateur_id = u.utilisateur_id WHERE u.mail = '" + mailResponsable + "')," + idIntervenant + "," + idFormation + ",'" + date + "')", function (err, result) {
        if (err) throw err;
        res.json("ok")
    });
})

router.get('/v2/:id/dates', function (req, res, next) {
    con.query('SELECT animer_formation.date_intervention as date from animer_formation where animer_formation.formation_id = ' + req.params.id, function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.post('/v2/', function (req, res) {
    let nom = req.body.nom
    let desc = req.body.description
    let descm = req.body.descriptionMore
    let imguri = req.body.imageUri
    let query = "INSERT INTO `formation`(`nom`, `description`, `descriptionMore`, `imageUri`, `supprime`) VALUES ('" + nom
        + "','" + desc + "', '" + descm + "','" + imguri + "', 0)"
    con.query(query, function (err, result) {
        if (err) {
            res.statusCode(404)
        }
    });
    res.json("ok")
})

router.get('/v2/inscription/:nom/:prenom/:mail/:date', function (req, res, next) {
    let nom = req.params.nom
    let prenom = req.params.prenom
    let mail = req.params.mail
    let date = req.params.date

    con.query('INSERT INTO `eleve` (`nom`, `prenom`, `mail`, `date_de_naissance`) VALUES ("'+ nom +'","'+ prenom +'","'+ mail +'","'+ date +'")', function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

module.exports = router;
