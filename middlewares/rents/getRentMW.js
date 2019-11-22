/*
* Loads the rent with the specified id from the database
* Also loads the car and client based on the ids in the rent, if the ids are present
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");
    const ClientModel = requireOption(objectRepository, "ClientModel");

    try {
        const {rent, car, client, formattedStartDate, formattedEndDate} = await RentModel.getRent(req.params.rentId);
        res.locals.rent = rent;
        res.locals.car = car;
        res.locals.clientInstance = client;
        res.locals.formattedStartDate = formattedStartDate;
        res.locals.formattedEndDate = formattedEndDate;

        if (typeof client === "undefined" && typeof req.session.clientId !== "undefined") {
            res.locals.clientInstance = await ClientModel.getClient(req.session.clientId);
            req.session.clientId = undefined;
        }
    } catch (e) {
        return next(e);
    }

    next();
});

