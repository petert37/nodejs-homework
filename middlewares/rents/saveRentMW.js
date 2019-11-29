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
        res.locals.error = "Invalid input data";
        return next();
    }

    if (req.body.clientId.length === 0) {
        res.locals.error = "Invalid client";
        return next();
    }

    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);

    if (isNaN(startDate)) {
        res.locals.error = "Invalid start date";
        return next();
    }

    if (isNaN(endDate)) {
        res.locals.error = "Invalid end date";
        return next();
    }

    if (endDate < startDate) {
        res.locals.error = "End cannot be before start";
        return next();
    }

    const rentId = typeof res.locals.rent !== "undefined" ? res.locals.rent._id : undefined;
    const {free, message} = await RentModel.isCarFree(rentId, req.body.carId, startDate, endDate);
    if (free === false) {
        res.locals.error = message;
        return next();
    }

    if (typeof res.locals.rent === "undefined") {
        res.locals.rent = RentModel.newRent();
    }

    res.locals.rent.carId = req.body.carId;
    res.locals.rent.clientId = req.body.clientId;
    res.locals.rent.startDate = startDate;
    res.locals.rent.endDate = endDate;

    try {
        await RentModel.saveRent(res.locals.rent);
    } catch (e) {
        return next(e);
    }

    next();
});

