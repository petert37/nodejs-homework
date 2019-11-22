/*
* Deletes the rent with the specified id from the database.
*/
const requireOption = require('../requireOption');
const wrapAsync = require('../wrapAsyncMW');

module.exports = (objectRepository) => wrapAsync(async (req, res, next) => {

    const RentModel = requireOption(objectRepository, "RentModel");
    try {
        await RentModel.deleteRent(res.locals.rent);
    } catch (e) {
        return next(e);
    }

    next();
});

