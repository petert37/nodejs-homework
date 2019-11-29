/*
* Loads the password reset email data based on a provided token in a query parameter
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const UserModel = requireOption(objectRepository, "UserModel");

    if (typeof req.query.token !== "undefined") {
        const token = req.query.token;
        try {
            const user = await UserModel.findUserByPasswordResetToken(token);
            if (user == null) {
                res.locals.error = "User not found";
                return next(new Error("User not found"));
            }
            res.locals.username = user.username;
            res.locals.passwordResetToken = token;
        } catch (e) {
            return next(e);
        }
    }

    next();
});