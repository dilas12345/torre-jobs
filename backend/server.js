const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

var corBasUrl = {
    origin: "http://localhost:8081"
};

app.use(cors(corBasUrl));

const db = require("./src/models");
const Role = db.role;

db.sequelize.sync({force: true}).then(() => {
    console.log("Reseting DB");
    initial();
})

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "human_resource"
    });

    Role.create({
        id: 3,
        name: 'admin'
    })
}
//content-type request "application/json"
app.use(bodyparser.json());

//const-type request for "application/x-www-form-urlencoded"
app.use(bodyparser.urlencoded({ extende: true}));

//Static route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Torre Job search engine"});
});

require('./src/routes/auth')(app);
require('./src/routes/userRoutes')(app);

//port request listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is fired up succesfully on localhost:${PORT}`)
});