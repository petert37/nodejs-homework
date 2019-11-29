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
            if (res.locals.clientInstance == null) {
                res.locals.error = "Client not found";
                return next(new Error("Client not found"));
            }
        } catch (e) {
            return next(e);
        } finally {
            req.session.clientId = undefined;
        }
    }

    next();
});

