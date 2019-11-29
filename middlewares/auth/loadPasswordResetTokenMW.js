/*
* Loads the password reset token from the URL query param
*/
module.exports = (objectRepository) => (req, res, next) => {
    res.locals.passwordResetToken = req.query.token;
    next();
};

