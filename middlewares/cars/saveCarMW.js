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
        return next();
    }

    if (typeof res.locals.car === "undefined") {
        res.locals.car = CarModel.newCar();
    }

    res.locals.car.model = req.body.model;
    res.locals.car.year = req.body.year;
    res.locals.car.plateNumber = req.body.plateNumber;

    try {
        await CarModel.saveCar(res.locals.car);
    } catch (e) {
        return next(e);
    }

    next();
});

