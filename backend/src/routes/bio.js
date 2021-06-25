const {verification} = require("../middleware");
const controller = require("../controllers/search");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
            'Access-Control-Allow-Origin', '*'
        );
        next();
    });

    app.post(
        "/api/search/job_search",
        controller.job_search
    );

    app.post(
        "/api/search/people_search",
        controller.people_search
    )
}