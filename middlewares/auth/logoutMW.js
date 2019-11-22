/*
* Signs out the user
*/
module.exports = (objectRepository) => (req, res, next) => {

    req.session.loggedIn = false;
    req.session.username = undefined;

    next();
};

