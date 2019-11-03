/*
* Checks if the password reset button was clicked in the login form, if so
* Generates a password reset token for the provided username and redirects to the reset email page
* In a real application, this would be sent to the user in an email, but here it just gets displayed
*/
module.exports = (objectRepository) => (req, res, next) => {

    if (typeof req.body["forgot-password"] !== "undefined") {
        const token = "kalsjdhf68d7fg6576d5fdf8gh768ui765n4b65d46sd8fgg"; //TODO
        return res.redirect(`/forgot-password-email?token=${token}`);
    }

    next();
};

