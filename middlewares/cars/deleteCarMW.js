/*
* Deletes the car with the specified id from the database.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    try {
        await CarModel.deleteCar(res.locals.car);
    } catch (e) {
        return next(e);
    }

    next();
});

