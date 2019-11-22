/*
* Loads the list of rents from the database
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");
    try {
        res.locals.rents = await RentModel.getRents();
    } catch (e) {
        return next(e);
    }

    next();
});

