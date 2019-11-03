/*
* Checks, if the pickClient button was pressed, if so
* Stores the details of the currently edited rent to the session so they can be restored after the user selects a client
* Redirects to /rents/edit/:rentId/clients
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository, redirectPath) => (req, res, next) => {

    if (typeof req.body["pickClient"] !== "undefined") {
        const path = typeof redirectPath === "function" ? redirectPath(req, res) : redirectPath;
        return res.redirect(path);
    }

    next();
};

