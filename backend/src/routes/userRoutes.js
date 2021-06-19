const controller = require("../controllers/user");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Origin", "*"
        );
        next();
    });

    app.get("/api/v1/all", controller.allAccess);

    app.get(
        "/api/v1/user",
        // [authJwt.verifyToken], 
        controller.userDashboard
    );

    app.get(
        "/api/v1/hr",
        // [authJwt.verifyToken, authJwt.isHumanResource], 
        controller.humanResourceDashboard
    )

    app.get(
        "/api/v1/admin",
        // [authJwt.verifyToken, authJwt.isAdmin], 
        controller.adminDashboard
    );

    app.get(
        "/api/v1/bios",
        controller.biosEndpoint
    );

    app.get(
        "/api/v1/opportunities",
        controller.jobEndpoint
    )
};