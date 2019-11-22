/*
* If the user is logged in, redirects to '/cars'
*/
module.exports = (objectRepository) => (req, res, next) => {

    if (req.session.loggedIn === true) {
        return res.redirect("/cars");
    }

    next();
};
