/*
* Loads the list of cars from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    try {
        res.locals.cars = await CarModel.getCars();
    } catch (e) {
        return next(e);
    }

    next();
});

