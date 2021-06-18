const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const db = require("../models");
const User  = db.user;

BASE_URL = "https://torre.bio/api/bios/$username";

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token found!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      next();
    });
};

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

isBioEndPOint = (req, res, next) => {
    let endpoint = {
        url: 'https://torre.bio/api/bios/$username',
        qs: {parameter1: 42},
        json: true
    }

    request(endpoint, (error, response, body) => {
        if(err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(body);
        }
    });
}
const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isHumanResource: isHumanResource,
    isHumanResourceOrAdmin: isHumanResourceOrAdmin
};
module.exports = authJwt;