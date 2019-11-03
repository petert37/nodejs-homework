/*
* Loads the rent with the specified id from the database
* Also loads the car and client based on the ids in the rent, if the ids are present
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");
    const {rent, car, client} = RentModel.getRent();
    res.locals.rent = rent;
    res.locals.car = car;
    res.locals.clientInstance = client;

    next();
};

