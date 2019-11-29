/*
* Changes the password of the given user to the given value
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const UserModel = requireOption(objectRepository, "UserModel");

    if (typeof req.body.passwordResetToken !== "undefined" && typeof req.body.password !== "undefined") {
        if (req.body.password.length === 0) {
            res.locals.error = "Invalid password";
            return next();
        }
        try {
            await UserModel.resetPassword(req.body.passwordResetToken, req.body.password);
        } catch (e) {
            if (e === "User not found" || e === "Invalid password reset token") {
                res.locals.error = e;
            } else {
                return next(e);
            }
        }
    }

    next();
});

