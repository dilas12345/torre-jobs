const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User  = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers[x-access-token];

    if (!token) {
        return res.status(403).send({
            message: "No token found"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }

        req.userId = decoded.id;
        next();
    })

    isAdmin = (req, res, next) => {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Admin Role Required"
                });

                return;
            });
        });
    };

    isHumanResource = (req, res, next) => {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "human_resource") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Humar Resource Required"
                });
            });
        });
    };

    isHumanResourceOrAdmin = (req, res, next) => {
        User.findByPk(req.userId).then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "human_resources") {
                        next();
                        return;
                    }

                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({
                    message: "Admin or HR Role Required"
                });
            });
        });
    };
}
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isHumanResource: isHumanResource,
    isHumanResourceOrAdmin: isHumanResourceOrAdmin
};
module.exports = authJwt;