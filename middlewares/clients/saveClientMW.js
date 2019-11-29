/*
* Update or create a client in the database.
* If res.locals.client exists, then update it, otherwise create a new entity.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const ClientModel = requireOption(objectRepository, "ClientModel");

    if (
        typeof req.body.name === "undefined" ||
        typeof req.body.phone === "undefined"
    ) {
        res.locals.error = "Invalid input data";
        return next();
    }

    if (req.body.name.length === 0) {
        res.locals.error = "Invalid name";
        return next();
    }

    if (req.body.phone.length === 0) {
        res.locals.error = "Invalid phone number";
        return next();
    }

    if (typeof res.locals.clientInstance === "undefined") {
        res.locals.clientInstance = ClientModel.newClient();
    }

    res.locals.clientInstance.name = req.body.name;
    res.locals.clientInstance.phone = req.body.phone;

    try {
        await ClientModel.saveClient(res.locals.clientInstance);
    } catch (e) {
        return next(e);
    }

    next();
});

