/*
* Checks the username and password. If they are correct, signs in the user.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const UserModel = requireOption(objectRepository, "UserModel");

    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.login(username, password);
        if (user != null) {
            req.session.loggedIn = true;
            req.session.username = user.username;
        } else {
            req.session.loggedIn = false;
            req.session.username = undefined;
        }

        res.locals.username = req.session.username;
    } catch (e) {
        return next(e);
    }

    next();
});

