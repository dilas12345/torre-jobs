const request = require("request");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content");
};

exports.userDashboard = (req, res) => {
    res.status(200).send("User Dashboard");
};

exports.adminDashboard = (req, res) => {
    res.status(200).send("Admin Dashboard");
};

exports.humanResourceDashboard = (req, res) => {
    res.status(200).send("HR Dashboard");
};

exports.biosEndpoint = (req, res) => {
    let endpoint = {
        url: 'https://torre.bio/api/bios/$username',
        qs: {parameter1: 42},
        json: true
    }

    request(endpoint, (err, response, body) => {
        if(err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(body);
        }
    });
};

exports.jobEndpoint = (req, res) => {
    let endpoint = {
        url: 'https://torre.co/api/opportunities/$id',
        qs: {parameter1: 42},
        json: true
    }

    request(endpoint, (err, body) => {
        if(err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(body);
        }
    });
};