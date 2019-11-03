/*
* Loads the car with the specified id from the database
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const CarModel = requireOption(objectRepository, "CarModel");
    res.locals.car = CarModel.getCar(req.params.carId);

    next();
};

