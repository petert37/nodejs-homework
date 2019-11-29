/*
* Loads the client with the specified id from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    try {
        res.locals.clientInstance = await ClientModel.getClient(req.params.clientId);
        if (res.locals.clientInstance == null) {
            res.locals.error = "Client not found";
            return next(new Error("Client not found"));
        }
    } catch (e) {
        return next(e);
    }

    next();
});

