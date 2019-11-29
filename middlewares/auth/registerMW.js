/*
* Created a new user with the provided name and password
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const UserModel = requireOption(objectRepository, "UserModel");

    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.register(username, password);
        if (user != null) {
            req.session.loggedIn = true;
            req.session.username = user.username;
        } else {
            req.session.loggedIn = false;
            req.session.username = undefined;
        }

        res.locals.username = req.session.username;
    } catch (e) {
        if (e === "User already exists" || e === "Invalid username" || e === "Invalid password") {
            res.locals.error = e;
        } else {
            return next(e);
        }
    }

    next();
});

