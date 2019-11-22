/**
 * Checks if the user is authenticated, if not, redirects to '/'
 */
module.exports = (objectRepository) => (req, res, next) => {

    if (typeof req.session.loggedIn === "undefined" || req.session.loggedIn === false) {
        return res.redirect("/");
    }

    res.locals.username = req.session.username;

    next();
};

