/*
* Loads the car with the specified id from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    try {
        res.locals.car = await CarModel.getCar(req.params.carId);
        if (res.locals.car == null) {
            res.locals.error = "Car not found";
            return next(new Error("Car not found"));
        }
    } catch (e) {
        return next(e);
    }

    next();
});

