/*
* Deletes the client with the specified id from the database.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    try {
        await ClientModel.deleteClient(res.locals.clientInstance);
    } catch (e) {
        return next(e);
    }

    next();
});

