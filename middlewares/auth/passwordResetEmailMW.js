/*
* Checks if the password reset button was clicked in the login form, if so
* Generates a password reset token for the provided username and redirects to the reset email page
* In a real application, this would be sent to the user in an email, but here it just gets displayed
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const UserModel = requireOption(objectRepository, "UserModel");

    if (typeof req.body !== "undefined" && typeof req.body["forgot-password"] !== "undefined" && typeof req.body.username !== "undefined") {
        try {
            const token = await UserModel.createPasswordResetToken(req.body.username);
            return res.redirect(`/forgot-password-email?token=${token}`);
        } catch (e) {
            return next(e);
        }
    }

    next();
});

