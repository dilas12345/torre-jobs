const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkForDuplicationUserAndEmail = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Username already exist!"
            });
            return;
        }

        //Email
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    message: "Email is taken"
                });
                return
            }

            next();
        });
    });
};

checkForRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Role does not exisit" + req.body.roles[i]
                });

                return;
            }
        }
    }

    next();
}

const verifyAuthentication = {
    checkForDuplicationUserAndEmail: checkForDuplicationUserAndEmail,
    checkForRoleExisted: checkForRoleExisted
};

module.exports = verifyAuthentication;