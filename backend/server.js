const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

var corBasUrl = {
    origin: "http://localhost:8081"
};

app.use(cors(corBasUrl));

//content-type request "application/json"
app.use(bodyparser.json());

//const-type request for "application/x-www-form-urlencoded"
app.use(bodyparser.urlencoded({ extende: true}));

//Static route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Torre Job search engine"});
});

//port request listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is fired up succesfully on ${PORT}`)
});