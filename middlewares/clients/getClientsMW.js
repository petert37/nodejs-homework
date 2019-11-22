/*
* Loads the list of clients from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");
    try {
        res.locals.clients = await ClientModel.getClients();
    } catch (e) {
        return next(e);
    }

    next();
});

