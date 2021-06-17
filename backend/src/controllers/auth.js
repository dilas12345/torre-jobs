const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    //Putting User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
      .then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User registered successful"});
                });
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({ message: "User registered successful"})
            })
        }
    })
    .catch(error => {
        res.status(500).send({ message: error.message });
    });
};

exports.login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
     .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found"});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Password not correct"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        })

        var authority = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authority.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authority,
                accessToken: token
            });
        });
    })
    .catch(error => {
        res.status(500).send({ message: error.message });
    });
}