/*
* Loads the car with the specified id from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    try {
        res.locals.car = await CarModel.getCar(req.params.carId);
    } catch (e) {
        return next(e);
    }

    next();
});

