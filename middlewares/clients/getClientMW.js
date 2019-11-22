/*
* Loads the client with the specified id from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    try {
        res.locals.clientInstance = await ClientModel.getClient(req.params.clientId);
    } catch (e) {
        return next(e);
    }

    next();
});

