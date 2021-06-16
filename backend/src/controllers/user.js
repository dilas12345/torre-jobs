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