/*
* Loads the password reset email data based on a provided token in a query parameter
*/
module.exports = (objectRepository) => (req, res, next) => {

    res.locals.username = "Peti";
    res.locals.passwordResetToken = req.query.token;

    next();
};

