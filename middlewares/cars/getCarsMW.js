/*
* Loads the list of cars from the database
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    res.locals.cars = CarModel.getCars();

    next();
};

