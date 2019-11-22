/*
* Loads the picked client based on the client id in the session
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");

    if (typeof req.session.clientId !== "undefined") {
        try {
            res.locals.clientInstance = await ClientModel.getClient(req.session.clientId);
        } catch (e) {
            return next(e);
        } finally {
            req.session.clientId = undefined;
        }
    }

    next();
});

