/*
* Update or create a rent in the database.
* If res.locals.rent exists, then update it, otherwise create a new entity.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");

    if (
        typeof req.body.carId === "undefined" ||
        typeof req.body.clientId === "undefined" ||
        typeof req.body.startDate === "undefined" ||
        typeof req.body.endDate === "undefined"
    ) {
        return next();
    }

    if (typeof res.locals.rent === "undefined") {
        res.locals.rent = RentModel.newRent();
    }

    res.locals.rent.carId = req.body.carId;
    res.locals.rent.clientId = req.body.clientId;
    res.locals.rent.startDate = req.body.startDate;
    res.locals.rent.endDate = req.body.endDate;

    try {
        await RentModel.saveRent(res.locals.rent);
    } catch (e) {
        return next(e);
    }

    next();
});

