/*
* Checks if the password reset token in the URL is valid.
* If it is valid, it sets the user id associated with it
*/
module.exports = (objectRepository) => (req, res, next) => {

    //TODO
    res.locals.passwordResetToken = req.query.token;

    next();
};

