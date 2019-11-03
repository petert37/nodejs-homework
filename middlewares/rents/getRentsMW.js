/*
* Loads the list of rents from the database
*/
const requireOption = require('../requireOption');

module.exports = (objectRepository) => (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");
    res.locals.rents = RentModel.getRents();

    next();
};

