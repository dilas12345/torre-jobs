const request = require("request");

exports.job_search = (req, res) => {
    console.log("I git hit");

    let endpoint = {
        url: 'https://search.torre.co/opportunities/_search/?[offset=$offset&size=$size&aggregate=$aggregate]',
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

exports.people_search = (req, res) => {
    let endpoint = {
        url: 'https://search.torre.co/people/_search/?[offset=$offset&size=$size&aggregate=$aggregate]',
        qs: {parameter1: 10},
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