/*
* Update or create a car in the database.
* If res.locals.car exists, then update it, otherwise create a new entity.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");

    if (
        typeof req.body.model === "undefined" ||
        typeof req.body.year === "undefined" ||
        typeof req.body.plateNumber === "undefined"
    ) {
        res.locals.error = "Invalid input data";
        return next();
    }

    if (isNaN(parseInt(req.body.year, 10))) {
        res.locals.error = "Invalid year";
        return next();
    }

    if (req.body.model.length === 0) {
        res.locals.error = "Invalid model";
        return next();
    }

    if (req.body.plateNumber.length === 0) {
        res.locals.error = "Invalid plate number";
        return next();
    }

    if (typeof res.locals.car === "undefined") {
        res.locals.car = CarModel.newCar();
    }

    res.locals.car.model = req.body.model;
    res.locals.car.year = parseInt(req.body.year, 10);
    res.locals.car.plateNumber = req.body.plateNumber;

    try {
        await CarModel.saveCar(res.locals.car);
    } catch (e) {
        return next(e);
    }

    next();
});

